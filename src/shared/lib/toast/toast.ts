import { t } from '@lingui/macro';
import { toast } from 'react-toastify';

import { endNameCut } from '../file/file-helpers';

const toastFileUploadStart = (name: string) => {
  const fileName = name.length > 16 ? endNameCut(name, 14) : name;
  toast.success(t`Upload ${fileName} start`);
};

const toastFileUploaded = (name: string) => {
  const fileName = name.length > 16 ? endNameCut(name, 14) : name;
  toast.success(t`Upload ${fileName} success`);
};

export const ToastApp = { toastFileUploadStart, toastFileUploaded };
