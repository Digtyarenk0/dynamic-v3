export const contentRequirements = {
  // Image
  image: {
    scale: {
      max: {
        width: 8000,
        height: 4500,
      },
      min: {
        width: 224,
        height: 224,
      },
    },
    maxSize: 50,
  },
  // Audio
  audio: {
    smpls: {
      min: 1102500,
      max: 26460000,
    },
    hz: {
      min: 22050,
    },
    duration: {
      min: 5,
      max: 600,
    },
    channels: {
      min: 1,
      max: 2,
    },
    maxSize: 50,
  },
  // Video
  video: {
    resolution: {
      max: {
        width: 2000,
        height: 1100,
      },
      min: {
        width: 200,
        height: 200,
      },
    },
    fps: {
      min: 20,
      max: 61,
    },
    duration: {
      min: 8,
      max: {
        more30FPS: 30,
        less30FPS: 60,
      },
    },
    maxSize: 50,
  },
};
