export const IPFS_GATE_URL = 'https://ipfs.io/ipfs';
export const getIPFSUrl = (hash: string) => `ipfs://${hash}`;
export const getNFTStorageUrlByHash = (hash: string) => `${IPFS_GATE_URL}/${hash}`;

export const ipfsToURL = (url: string): string => {
  try {
    const { protocol, pathname } = new URL(url);
    const isIpfs = protocol === 'ipfs:';
    if (!isIpfs) return url;
    const isGateway = pathname.substring(0, 7) === '//ipfs/';
    return getNFTStorageUrlByHash(url.substring(isGateway ? 12 : 7));
  } catch (error) {
    console.error('url invalid', error, url);
    return url;
  }
};

export const isIPFSHashCheck = (hash: string) => {
  try {
    const hashURL = new URL(hash);
    if (hashURL.protocol === 'ipfs:') {
      const urlWithoutProt = hash.split('//')[1];
      const isIPFSsPrefix = urlWithoutProt.split('ipfs/').length > 1 && urlWithoutProt.split('ipfs/')[0] === '';
      const hashWithPath = isIPFSsPrefix ? urlWithoutProt.split('ipfs/')[1] : urlWithoutProt;
      return hashWithPath;
    }
  } catch (_) {
    return false;
  }
  return false;
};
