import { MintType } from 'entities/request/model/types/request/request.lists';

export interface MintData {
  name: string;
  description: string;
  hash: string;
  isUpload: boolean;
  fileStorageUrl?: string;
}

export interface MintDataImage extends MintData {
  type: MintType.image | MintType.video;
}

export interface MintDataAudio extends MintData {
  type: MintType.audio;
  preview: File;
}

export interface MintProps {
  id: number;
  contentId: number;
  metadata: MintDataAudio | MintDataImage;
}
