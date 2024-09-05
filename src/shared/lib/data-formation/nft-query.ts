import { UserRequest, MethodList } from 'entities/request';
import { StatusList } from 'entities/request/model/types/request/request.status';

export const checkIsNFT = (query: UserRequest): any | undefined => {
  const isEnd = query.status === StatusList.checked || query.status === StatusList.detected;
  if (query.method !== MethodList.extract || !isEnd) return;
  const content = Array.isArray(query.content) ? query.content[0] : query.content;
  if (!content?.nft || !content?.blockchain) return;
  return 'original';
};
