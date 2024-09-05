export type patformOptions = 'all' | 'watermark' | 'rarible' | 'opensea';

export interface FilterProps<T> {
  selectedOption: T;
  setSelectedOption: (p: T) => void;
}
