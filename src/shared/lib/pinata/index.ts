import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { instance } from 'shared/api';

import { IPFS_GATE_URL } from '../url/url-ipfs';

import { checkLocalStoreContentHash, saveLocalStoreContentHash } from './helper';

const PINATA_API_URL = 'https://api.pinata.cloud';

const enpointsBackend = {
  pin: '/ipfs/pin',
};

interface PinnedFile {
  IpfsHash: string; //  "QmX5dXeJsZFAYntMW8W2iyKsBUa49RGKEjtReNHu3qTFsn",
  PinSize: number; // 148504,
  Timestamp: string; // "2024-08-13T12:28:02.781Z"
}

const getToken = async (contentId: string, ipfs = false): Promise<AxiosResponse<{ key: string }>> =>
  instance.get(`${enpointsBackend.pin}/${contentId}?ipfs=${ipfs}`);

const pinFile = async (token: string, body: FormData): Promise<AxiosResponse<PinnedFile>> =>
  axios.post(`${PINATA_API_URL}/pinning/pinFileToIPFS`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

const pinJson = async (token: string, body: object): Promise<AxiosResponse<PinnedFile>> =>
  axios.post(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const uploadFile = async (contentId: number | string, formData: FormData, preview = false): Promise<string> => {
  const key = preview ? contentId + 'PREVIEW' : contentId + 'FILE';
  const cid = checkLocalStoreContentHash(key);
  if (cid) return cid;
  const { data } = await getToken(contentId.toString());
  formData.append('pinataMetadata', JSON.stringify({ name: `watermerked-file-${contentId}` }));
  const res = await pinFile(data.key, formData);
  saveLocalStoreContentHash(key, res.data.IpfsHash);
  return res.data.IpfsHash;
};

const compareMetadataByCid = async (cid: string, metadata: object): Promise<boolean> => {
  try {
    const client = axios.create();
    axiosRetry(axios, { retries: 3 });
    const res = await client.get<AxiosResponse<object>>(`${IPFS_GATE_URL}/${cid}`, { timeout: 15_000 });
    const isExist = JSON.stringify(metadata) === JSON.stringify(res.data);
    return isExist;
  } catch (error: any) {
    console.log('Compare Metadata by ' + cid, error?.message);
    return false;
  }
};

const uploadJson = async (contentId: number | string, body: object): Promise<string> => {
  const key = contentId.toString() + 'JSON';
  const cid = checkLocalStoreContentHash(key);
  const isExistCid = cid ? await compareMetadataByCid(cid, body) : false;
  if (cid && isExistCid) return cid;
  const { data } = await getToken(contentId.toString(), true);
  const metadata = { pinataContent: body, pinataMetadata: { name: `metadata` } };
  const res = await pinJson(data.key, metadata);
  saveLocalStoreContentHash(key, res.data.IpfsHash);
  return res.data.IpfsHash;
};

export const Pinata = {
  uploadFile,
  uploadJson,
  getToken,
  pinFile,
};
