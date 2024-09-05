import { t } from '@lingui/macro';
import Big from 'big.js';

import { AppConfig } from 'shared/config/envs';
import { Validators } from 'shared/lib/validators';
import { AppOptions } from 'shared/types/options';

import { getAudioMetadata } from './audio/audio.helper';
import { getFileType } from './file-helpers';
import { checkAudioMetadata, checkAudioSize } from './validators/audio';
import { checkImageScale, checkImageSize } from './validators/image';
import { checkVieoMetadata } from './validators/video';

interface FileUnValidErrorI {
  file: File;
  error: { message: string };
}
interface FilesVerificationsI {
  files: File[] | [];
  errors: FileUnValidErrorI[] | [];
}

export const checkFileSize = (size: number, maxSize = 50) => Big(size).gt(Big(1000 ** 2).mul(maxSize));

export const verifications = async (inputFiles: File[]): Promise<FilesVerificationsI> => {
  const uploadedFiles = [...inputFiles];
  const checkedFiles = await Promise.all(
    uploadedFiles.map(async (file) => {
      try {
        const type = getFileType(file.type);
        // Type
        const typeMsg = Validators.checkIsNotSupportFileType(file.name, type);
        if (typeMsg) throw new Error(typeMsg);
        // Scale
        switch (type) {
          case AppOptions.fileContentTypes.image: {
            checkImageSize(file.size);
            await checkImageScale(file);
            break;
          }
          case AppConfig.support.audio && AppOptions.fileContentTypes.audio: {
            checkAudioSize(file.size);
            const meta = await getAudioMetadata(file);
            checkAudioMetadata(meta);
            break;
          }
          case AppConfig.support.video && AppOptions.fileContentTypes.video: {
            await checkVieoMetadata(file);
            break;
          }
          default:
            throw new Error(t`Err unsupport content type`);
        }
        // Weight
      } catch (error) {
        console.error(error);
        if (error instanceof Error)
          return {
            file,
            error: { message: error?.message },
          };
      }
      return file;
    }),
  );

  const files = checkedFiles.filter((i) => i instanceof File) as File[];
  const errors = checkedFiles.filter((i) => 'error' in i) as FileUnValidErrorI[];

  return {
    files,
    errors,
  };
};
