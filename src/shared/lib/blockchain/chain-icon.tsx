import { FC, SVGAttributes } from 'react';

import EthSvg from 'shared/assets/icons/blockchains/eth.svg';
import PolygonSvg from 'shared/assets/icons/blockchains/polygon.svg';
import SolanaSvg from 'shared/assets/icons/blockchains/solana.svg';

import { Lists } from 'entities/request';
import { BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

interface ChainIcoProps extends SVGAttributes<SVGElement> {
  chain: BlockchainNamesList;
}

export const ChainIco: FC<ChainIcoProps> = (props) => {
  const { chain, ...otherProps } = props;
  switch (chain) {
    case BlockchainNamesList.solana:
    case BlockchainNamesList.solana_dev:
      return <SolanaSvg {...otherProps} />;
    case BlockchainNamesList.ethereum:
    case BlockchainNamesList.sepolia:
      return <EthSvg {...otherProps} />;
    case BlockchainNamesList.polygon:
    case BlockchainNamesList.amoy:
      return <PolygonSvg {...otherProps} />;
    default:
      return <EthSvg {...otherProps} />;
  }
};
