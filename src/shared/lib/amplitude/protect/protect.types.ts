import { type, upload } from '../index.types';

export interface ProtectSubmitProps {
  type: type;
  upload: upload;
  items_ids: string[];
  items_types: string[];
  items_size: number;
}
