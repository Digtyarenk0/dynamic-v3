import { t } from '@lingui/macro';
import axios from 'axios';

import { EVMChains } from 'entities/request';

import { checkRaribleURL } from '../rarible/base';
import { ipfsToURL } from '../url/url-ipfs';
import { checkIPFSLinkContent, directLinkValidate, verificationSizeType } from '../url/url-support';
import { isIPFSHash, isRaribleUrl, isOpenSeaUrl, isGoogleDriveLink } from '../validators/validators';

import { useTokenData } from './token-data';
import { TokenBaseMetadata } from './token-data/types/token-data';

export const useValidateContentUrl = () => {
  const bch = useTokenData();

  const checkRarible = async (raribleURL: string) => {
    const { chain, collection, tokenId } = checkRaribleURL(raribleURL);
    const isEVM = chain !== 'solana';
    const url = await (isEVM
      ? bch.getERCURL({ collection, token: tokenId, blockchain: chain as EVMChains })
      : bch.getSolURL(tokenId));
    if (!url) throw new Error('Rarible content not found.');
    const link = ipfsToURL(url);
    const resMetadata = await axios.get<TokenBaseMetadata>(link);
    const contentLink = resMetadata.data?.metadata_uri || resMetadata.data.image;
    const contentURL = ipfsToURL(contentLink);
    const res = await axios.head(contentURL);
    const type = res.headers['content-type'];
    const size = Number(res.headers['content-length']);
    verificationSizeType(type, size);
    return true;
  };

  const validateContentURL = async (url: string) => {
    try {
      // IPFS
      const isIPFS = isIPFSHash.test(url);
      if (isIPFS) {
        await checkIPFSLinkContent(url);
        return { valid: true };
      }
      // Rarible
      const isRarible = isRaribleUrl(url);
      if (isRarible) {
        await checkRarible(url);
        return { valid: true };
      }
      //
      const isOpenSea = isOpenSeaUrl(url);
      const isGoogleDrive = isGoogleDriveLink(url);
      if (isOpenSea || isGoogleDrive) {
        return { valid: true };
      }

      const directLink = directLinkValidate(url);
      if (!directLink) return { valid: true };

      //
    } catch (error: any) {
      console.error(error);
      if (error?.message === 'Network Error') {
        return {
          msg: t`Content storage resource is not responding`,
          valid: false,
        };
      }
      return {
        msg: error?.message as string,
        valid: false,
      };
    }
  };

  return { validateContentURL };
};
