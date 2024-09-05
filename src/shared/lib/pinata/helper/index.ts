const CONTENT_UPLOAD_HASH = 'CONTENT_UPLOAD_HASH_IPFS';
const EXPIRATION_TIME_MS = 4 * 60 * 60 * 1000;

interface HashEntry {
  hash: string;
  timestamp: number;
}

export const checkLocalStoreContentHash = (contentId: string): string | null => {
  const storedHashes = localStorage.getItem(CONTENT_UPLOAD_HASH);
  if (!storedHashes) return null;

  const hashMap: Record<string, HashEntry> = JSON.parse(storedHashes);
  const entry = hashMap[contentId];

  if (!entry) return null;
  if (Date.now() - entry.timestamp < EXPIRATION_TIME_MS) return entry.hash;

  delete hashMap[contentId];
  localStorage.setItem(CONTENT_UPLOAD_HASH, JSON.stringify(hashMap));
  return null;
};

export const saveLocalStoreContentHash = (contentId: string, hash: string): void => {
  const storedHashes = localStorage.getItem(CONTENT_UPLOAD_HASH);
  const hashMap: Record<string, HashEntry> = storedHashes ? JSON.parse(storedHashes) : {};
  hashMap[contentId] = { hash, timestamp: Date.now() };
  localStorage.setItem(CONTENT_UPLOAD_HASH, JSON.stringify(hashMap));
};
