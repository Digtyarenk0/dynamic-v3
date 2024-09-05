import Big from 'big.js';
import { formatEther, parseEther } from 'ethers';

import { FileUtils } from 'shared/lib/file';
import { getAudioMetadata } from 'shared/lib/file/audio/audio.helper';
import { getCountSupportWMByScale, getImageScale } from 'shared/lib/file/validators/image';
import { getVideoMetadata, VideoMetada } from 'shared/lib/file/validators/video';
import { AppOptions } from 'shared/types/options';

export const MIN_CONTENT_COST = Big('0.01'); // 0.01 USDT

const bytes = Big('1000000');
const usdt = parseEther('1').toString();
const costOneByte = Big(usdt).div(bytes); // (1 USDT / Bytes) === (1 MB === 1 USDT)
const server_cost = Big('1.5').div(60 * 60); // server_cost = 1 hour of server time = 1.5$
const profit = '20'; // // profit *- our desired *х2 of profit per operation. 1.4 === 40% or 2 === 100% profit

// Pixels = millions of pixels in an image
// Embed_only_time = Pixels*0.37 + 0.1 (seconds)
// Extract_full_Time = 0.35 * Pixels + 0.3 (seconds)
// Embed_full_time = 0.35 * Pixels + 0.3 + Pixels*0.37 + 0.1 (seconds)

// operation_time - Extract_full_Time or Embed_full_time, depending on the type of operation
// server_cost = 1 hour of server time = 1.5$
// profit *- our desired *х2 of profit per operation
// *Watermarking_cos*t = profit * operation_time * server_cost / (60*60)

const calcCostByOperationTime = (time: Big) => Big(profit).mul(time).mul(server_cost);

const getExtractFullTime = (mPixels: string, countWMs: number): Big =>
  Big(0.35)
    .mul(mPixels)
    .plus(0.3)
    .mul(countWMs / 3); // extract_full_Time = 0.35 * Pixels + 0.3 (seconds)

const costImageExtract = async (file: File, countWMs: number, minCost: boolean): Promise<Big> => {
  const { width, height } = await getImageScale(file);
  const mPixels = Big(width).mul(height).div(1_000_000).toString(); // pixels in million
  const extract_full_Time = getExtractFullTime(mPixels, countWMs);
  const cost = calcCostByOperationTime(extract_full_Time); // *Watermarking_cos*t = profit * operation_time * server_cost / (60*60)

  // const scaleQR = Big(224).mul(224).add(316);
  // const costSize = Big(formatEther(costOneByte.mul(file.size).toString()));
  // const cost = costSize.add(costScale);

  // const scaleSize = Big(width).mul(height);
  // const costScale = scaleSize.div(5000000);

  return cost.gte(MIN_CONTENT_COST) ? cost : minCost ? MIN_CONTENT_COST : cost;
};

const costImageEmbed = async (file: File, countWMs: number, minCost: boolean): Promise<Big> => {
  const { width, height } = await getImageScale(file);
  const mPixels = Big(width).mul(height).div(1_000_000).toString(); // pixels in million
  const embed_only_time = Big(mPixels).mul(0.37).plus(0.1); // Embed_only_time = Pixels * 0.37 + 0.1 (seconds)
  const extract_full_Time = getExtractFullTime(mPixels, countWMs);
  const embed_full_time = embed_only_time.plus(extract_full_Time); // Embed_full_time = Embed_only_time + Extract_full_Time (seconds)
  const cost = calcCostByOperationTime(embed_full_time); // *Watermarking_cos*t = profit * operation_time * server_cost / (60*60)
  // const scaleQR = Big(224).mul(224).add(316);

  // const scaleSize = Big(width).mul(height);
  // const costScale = scaleSize.div(6000000);
  // const costWMNumbers = Big(numberOfCodes).mul(0.05);
  // const cost = costScale.add(extractCost).add(costWMNumbers);

  return cost.gte(MIN_CONTENT_COST) ? cost : minCost ? MIN_CONTENT_COST : cost;
};

const costAudioExtract = async (file: File): Promise<Big> => {
  const costSize = Big(formatEther(costOneByte.mul(file.size).toString()));
  return costSize;
};

const costAudioEmbed = async (file: File, numberOfCodes: number, extractCost: Big): Promise<Big> => {
  const costSize = Big(formatEther(costOneByte.mul(file.size).toString()));
  const costWMNumbers = Big(numberOfCodes).mul(0.05);
  const cost = costSize.add(extractCost).add(costWMNumbers);
  return cost;
};

const getVideoMetaMul = (m: VideoMetada, multi: number, d: number): Big =>
  Big(m.height)
    .mul(m.width)
    .mul(m.duration)
    .mul(multi)
    .mul(10 ** d);

interface CalculateCost {
  extract: Big;
  embed: Big;
}

const calculateCost = async (file: File, minCost = true): Promise<CalculateCost> => {
  const type = FileUtils.getFileType(file.type);
  switch (type) {
    case AppOptions.fileContentTypes.image: {
      const countWMs = await getCountSupportWMByScale(file);
      const extract = await costImageExtract(file, countWMs, minCost);
      const embed = await costImageEmbed(file, countWMs, minCost);
      return { extract, embed };
    }
    case AppOptions.fileContentTypes.audio: {
      const meta = await getAudioMetadata(file);
      // Cost = profit * operation_time * server_cost
      // operation_time_extract = 0.5 * audio_duration_seconds
      const operation_time_extract = Big(0.5).mul(meta.duration);
      const extract = calcCostByOperationTime(operation_time_extract);
      // operation_time_embed = 0.01 * audio_duration_seconds + 3 (Embed, seconds)
      const operation_time_embed = Big(0.01).mul(meta.duration).add(3);
      const embed = calcCostByOperationTime(operation_time_embed.add(operation_time_extract));
      return { extract, embed };
    }
    case AppOptions.fileContentTypes.video: {
      // Cost = profit * operation_time * server_cost
      const meta = await getVideoMetadata(file);
      // height * width * fps * video_duration * 6.6 * 10^-9
      // operation_time_extract = 0.7 + height * width * fps * video_duration * 6.6 * 10^-9          (Extract, seconds)
      const operation_time_extract = Big(0.7).add(getVideoMetaMul(meta, 6.6, -9));
      const extract = calcCostByOperationTime(operation_time_extract);
      // operation_time_embed = 3.58 + height * width * fps * video_duration * 3.7 * 10^-8        (Embed, seconds)
      const operation_time_embed = Big(3.58).add(getVideoMetaMul(meta, 3.7, -8));
      const embed = calcCostByOperationTime(operation_time_embed.add(operation_time_extract));
      return { extract, embed };
    }
    default:
      return { extract: Big(0), embed: Big(0) };
  }
};

const calculateCostMock = async (file: File, minCost = true): Promise<CalculateCost> => ({
  extract: Big(0),
  embed: Big(0),
});

export const BillingCalculator = {
  costImageExtract,
  costImageEmbed,
  costAudioExtract,
  costAudioEmbed,
  calculateCost,
  calculateCostMock,
};
