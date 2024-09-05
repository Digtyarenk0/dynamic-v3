import { parseBlob } from 'music-metadata-browser';

export const getAudioDuration = async (file: File): Promise<number> => {
  return new Promise((res) => {
    const objectUrl = URL.createObjectURL(file);
    const audioToPlay = new Audio(objectUrl);
    audioToPlay.addEventListener('loadedmetadata', function () {
      URL.revokeObjectURL(objectUrl);
      res(audioToPlay.duration);
    });
  });
};

export interface AudioMetadata {
  duration: number;
  channels: number;
  samples: number;
}

export const getAudioMetadata = async (file: File): Promise<AudioMetadata> => {
  const { format } = await parseBlob(file);
  return {
    channels: format.numberOfChannels as number,
    duration: Number(format.duration?.toFixed(0) || 0) as number,
    samples: format.sampleRate as number,
  };
};
