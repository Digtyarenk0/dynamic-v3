// Create data URL by Image Bitmap
export const getBase64Image = async (img: ImageBitmap) => {
  // Create an empty canvas element
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  const dataURL = canvas.toDataURL('image/png');

  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  return dataURL;
};

export const getVideoFrameDataURL = async (propFile: File) => {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.src = URL.createObjectURL(propFile);
  document.body.append(video);
  video.muted = true;
  video.style.display = 'none';

  // render frame start
  await video.play();
  video.pause();
  // frame from 1/5 duration
  const frameTime = video.duration / 5;
  video.currentTime = frameTime;
  await video.play();
  video.pause();
  // render frame end

  const bitmap = await createImageBitmap(video);
  video.remove();
  return getBase64Image(bitmap);
};

// Create File by Image Bitmap
export const getBaseFileFrom = async (img: ImageBitmap) => {
  // Create an empty canvas element
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  const dataURL = canvas.toDataURL('image/png');
  const blob = await fetch(dataURL).then((response) => response.blob());
  const buf = await blob.arrayBuffer();
  const f = new File([buf], 'preiew.png');

  return f;
};

// Create File by Video
export const getVideoFrameFile = async (propFile: File): Promise<File> => {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.src = URL.createObjectURL(propFile);
  document.body.append(video);
  video.muted = true;
  video.style.display = 'none';
  // render frame start

  await video.play();
  video.pause();
  // frame from 1/5 duration
  const frameTime = video.duration / 5;
  video.currentTime = frameTime;
  await video.play();
  video.pause();
  // render frame end
  const bitmap = await createImageBitmap(video);
  video.remove();
  return getBaseFileFrom(bitmap);
};
