import { t } from '@lingui/macro';
import { Metaplex } from '@metaplex-foundation/js';
import { Cluster, Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import axios from 'axios';
import { ethers, JsonRpcProvider, Provider, EventLog, Log } from 'ethers';
import { useCallback } from 'react';

import { AppConfig } from 'shared/config/envs';
import { CHAIN_NAMES_RPC_LINK } from 'shared/constants/blockchain-maps';
import { getNFTStorageUrlByHash, isIPFSHashCheck } from 'shared/lib/url/url-ipfs';
import { isUrl } from 'shared/lib/validators/validators';
import { FormedMetadata } from 'shared/types/nft';

import { EVMChains } from 'entities/request';

import * as ERCURLContract from './contracts/erc-721-1155';
import { isJSONBase64, parseBase64, tokenIdFormTransferEvent, isSolanaChain } from './helper/parse';
import {
  GetCollectionTokenIds,
  GetEVMContractTransferLogs,
  GetTokenByHashFromEvents,
  GetTokenByHashFromEventsProps,
  GetURLEVM,
  GetURLProps,
  TokenBaseMetadata,
  TokenIdsHash,
} from './types/token-data';

export const useTokenData = () => {
  const getEVMProvider = useCallback(async (chain: EVMChains): Promise<Provider> => {
    const rpcLink = CHAIN_NAMES_RPC_LINK[chain];
    return new JsonRpcProvider(rpcLink);
  }, []);

  const getSolProvider = useCallback(async (): Promise<Metaplex> => {
    const connection = new Connection(clusterApiUrl(AppConfig.chains.solana.env as Cluster));
    // @ts-ignore
    return new Metaplex(connection);
  }, []);

  const getERCURL = useCallback(async (props: GetURLEVM): Promise<string | null> => {
    const { blockchain, collection, token } = props;
    const provider = await getEVMProvider(blockchain);
    const ins = new ethers.Contract(collection, ERCURLContract.abi, provider);

    const url721 = await ins.tokenURI(token).catch((e: any) => console.error(e?.body)); //721
    const url1155 = await ins.uri(token).catch((e: any) => console.error(e?.body)); // 1155

    const url = url721 || url1155;
    return url || null;
  }, []);

  const getSolURL = useCallback(async (token: string): Promise<string | null> => {
    try {
      const provider = await getSolProvider();
      const mintAddress = new PublicKey(token);
      const nft = await provider.nfts().findByMint({ mintAddress });
      return nft.uri;
    } catch (error) {
      console.error('Get sol data', error);
      return null;
    }
  }, []);

  const getEVMOwner = useCallback(async (props: GetURLEVM): Promise<string> => {
    const { blockchain, collection, token } = props;
    const provider = await getEVMProvider(blockchain);
    const ins = new ethers.Contract(collection, ERCURLContract.abi, provider);

    const owner = await ins.ownerOf(token).catch((e: any) => console.error(e?.body));
    return owner || '';
  }, []);

  const getSolOwner = useCallback(async (token: string): Promise<string> => {
    try {
      const provider = await getSolProvider();
      const mintAddress = new PublicKey(token);
      const nft = await provider.nfts().findByMint({ mintAddress });
      return nft.address.toString();
    } catch (error) {
      console.error('get sol owner', error);
      return '';
    }
  }, []);

  const getURL = useCallback(async (props: GetURLProps): Promise<string | null> => {
    if (isSolanaChain(props.blockchain)) return await getSolURL(props.token);
    return await getERCURL(props as GetURLEVM);
  }, []);

  const getCollectionAddress = useCallback((props: GetURLProps): string => {
    if (isSolanaChain(props.blockchain)) return AppConfig.chains.solana.ownerProgram;
    const { collection } = props as GetURLEVM;
    return collection;
  }, []);

  const getNowBlock = useCallback(async (chain: EVMChains): Promise<number> => {
    const provider = await getEVMProvider(chain);
    return provider.getBlockNumber();
  }, []);

  const formMetadata = useCallback(
    async (props: GetURLProps, metadata: TokenBaseMetadata, metadataURL: string): Promise<FormedMetadata> => {
      const owner = await (isSolanaChain(props.blockchain)
        ? getSolOwner(props.token)
        : getEVMOwner(props as GetURLEVM));
      return {
        // Props data
        blockchain: props.blockchain,
        // Blockchain data
        contract: getCollectionAddress(props),
        owner,
        tokenId: props.token,
        metadata_uri: metadataURL,
        // JSON Data
        name: metadata.name,
        description: metadata.description,
        image: metadata?.image,
        animation_url: metadata?.animation_url,
        // watermarked content hash
        hash: metadata?.hash,
      };
    },
    [],
  );

  const getMetadata = useCallback(async (props: GetURLProps): Promise<FormedMetadata> => {
    const pathToMetadata = await getURL(props);
    if (!pathToMetadata) throw new Error(t`The token contract did not return any data.`);
    const isBase64 = isJSONBase64(pathToMetadata);
    if (isBase64) {
      const parsedMetadata: TokenBaseMetadata = parseBase64(pathToMetadata);
      const metadata = await formMetadata(props, parsedMetadata, pathToMetadata);
      return metadata;
    }
    const isUrlChecked = isUrl(pathToMetadata);
    const isIPFS = isIPFSHashCheck(pathToMetadata);
    if (isUrlChecked || isIPFS) {
      // For 'hash/{token id}' ipfs url
      const ipfsToken = isIPFS ? isIPFS.replace('{id}', props.token) : pathToMetadata;
      const preparedURL = isIPFS ? getNFTStorageUrlByHash(ipfsToken) : pathToMetadata;
      const { data: parsedMetadata } = await axios.get<TokenBaseMetadata>(preparedURL);
      const metadata = await formMetadata(props, parsedMetadata, pathToMetadata);
      return metadata;
    }
    throw new Error(t`Token data not recognized.`);
  }, []);

  const getEVMContractTransferLogs = useCallback(async (props: GetEVMContractTransferLogs): Promise<EventLog[]> => {
    const { collection, chain, blockFrom, checkBlocks = 50 } = props;
    const provider = await getEVMProvider(chain);
    const contract = new ethers.Contract(collection, ERCURLContract.abi, provider);
    const erc721Events = await contract.queryFilter('Transfer', blockFrom); // 721
    const events1155Single = await contract.queryFilter('TransferSingle', blockFrom); // 1155 for 1 copie
    const events = [...erc721Events, ...events1155Single];
    return events as EventLog[];
  }, []);

  const getCollectionTokenIds = useCallback(async (props: GetCollectionTokenIds): Promise<TokenIdsHash[]> => {
    const { collection, chain, blockFrom, userAddress, checkBlocks } = props;
    const events = await getEVMContractTransferLogs({
      collection,
      chain,
      blockFrom,
      checkBlocks,
    });
    const userEvents = events.filter((e) => e.args?.[1]?.toLowerCase() === userAddress.toLowerCase());
    const idsBN = userEvents.map((e) => tokenIdFormTransferEvent(e));
    const ids = idsBN.filter(Boolean).map((i) => ({ id: BigInt(i.id).toString(), tx: i.tx }));
    return ids;
  }, []);

  const getTokenByHashFromEvents = useCallback(
    async (props: GetTokenByHashFromEventsProps): Promise<GetTokenByHashFromEvents | undefined> => {
      const { collection, chain, blockFrom, userAddress, checkBlocks = 50, hash } = props;
      const tokens = await getCollectionTokenIds({
        collection,
        chain,
        blockFrom,
        userAddress,
        checkBlocks,
      });
      // iteration tokens (get metadata adn compare hash)
      for await (const token of tokens) {
        const metadata = await getMetadata({
          collection,
          token: token.id,
          blockchain: chain,
        });
        if (metadata?.hash === hash) {
          return {
            id: token.id,
            hash: token.tx,
            metadata,
          };
        }
      }
    },
    [],
  );

  return {
    getEVMProvider,
    getSolProvider,
    getERCURL,
    getSolURL,
    getURL,
    getNowBlock,
    getMetadata,
    getEVMContractTransferLogs,
    getCollectionTokenIds,
    getTokenByHashFromEvents,
  };
};
