import { upload } from '../index.types';

export interface CheckSubmitProps {
  type: 'single';
  upload: upload;
  items_ids: string[];
  items_types: string[];
  items_size: number;
}
