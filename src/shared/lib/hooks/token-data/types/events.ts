export interface eventTransferERC721 {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  address: string; // contract
  data: string;
  topics: string[]; // [2 - user address]  [3 - token Id]
  transactionHash: string;
  logIndex: number;
  event: 'Transfer';
  eventSignature: 'Transfer(address,address,uint256)';
  args: [
    string, // from
    string, // user address
    {
      type: 'BigNumber';
      hex: string; // token id
    },
  ];
}

export interface eventTransferERC1155 {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  address: string; // contract
  data: string;
  topics: string[]; // [2 - user address]  [3 - token Id]
  transactionHash: string;
  logIndex: number;
  event: 'TransferSingle';
  eventSignature: 'TransferSingle(address,address,address,uint256,uint256)';
  args: [
    string, // from
    string, // user address
    {
      type: 'BigNumber';
      hex: string; // token id
    },
    {
      type: 'BigNumber';
      hex: string; // count copies
    },
  ];
}

export type eventTransferERC = eventTransferERC721 | eventTransferERC1155;
