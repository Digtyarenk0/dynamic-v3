import { useEffect, memo } from 'react';

import { getBlockchainByChainId, getBlockchainNameByInstance } from 'shared/lib/blockchain/parse';
import { Select } from 'shared/ui/select';

import { Lists, PlatformList, RequestWatermarked } from 'entities/request';
import { updateRequestSelector } from 'entities/request/model/service/update-req-selector/update-req-selector';
import { BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

interface SelectorProps {
  query: RequestWatermarked;
}

export const SelectorPlatform = memo(({ query }: SelectorProps) => {
  const initPlatformSelector = Lists.PlatformList.watermark;

  const setPlatfrom = (platform: PlatformList) => {
    updateRequestSelector({ id: query.id, type: 'platform', platform });
    if (platform === PlatformList.rarible) {
      updateRequestSelector({ id: query.id, type: 'blockchain', chain: BlockchainNamesList.polygon });
    }
  };

  useEffect(() => {
    updateRequestSelector({ id: query.id, type: 'platform', platform: initPlatformSelector });
  }, []);

  return (
    <Select
      selectedOption={query.platform.value}
      setSelectedOption={setPlatfrom}
      placeholder={initPlatformSelector}
      styleMini
      options={[
        { text: initPlatformSelector, value: initPlatformSelector },
        { text: Lists.PlatformList.rarible, value: Lists.PlatformList.rarible },
      ]}
      classNameP="text-grey-opacity-64"
    />
  );
});

export const SelectorBlockchain = memo(({ query }: SelectorProps) => {
  const initBlockchainSelector = getBlockchainNameByInstance(BlockchainNamesList.polygon);

  const setBlockchain = (chain: BlockchainNamesList) => {
    if (query.chain.value !== chain) {
      updateRequestSelector({ id: query.id, type: 'blockchain', chain });
    }
  };

  useEffect(() => {
    updateRequestSelector({ id: query.id, type: 'blockchain', chain: initBlockchainSelector });
  }, []);

  return (
    <Select
      selectedOption={query.chain.value}
      setSelectedOption={setBlockchain}
      placeholder={initBlockchainSelector}
      classNameP="text-grey-opacity-64"
      styleMini
      options={[
        { text: getBlockchainByChainId(initBlockchainSelector), value: initBlockchainSelector },
        // TODO: RM mock solana
        // {
        //   text: getBlockchainByChainId(BlockchainNamesList.solana),
        //   value: getBlockchainNameByInstance(BlockchainNamesList.solana),
        // },
      ]}
    />
  );
});
