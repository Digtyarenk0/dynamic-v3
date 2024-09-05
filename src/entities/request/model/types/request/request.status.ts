export enum StatusList {
  'uploading' = 'uploading',
  'uploaded' = 'uploaded',
  'payment' = 'payment',
  'paid' = 'paid',
  'checking' = 'checking',
  'checked' = 'checked',
  'detected' = 'detected',
  'watermarking' = 'watermarking',
  'watermarked' = 'watermarked',
  'minting' = 'minting',
  'parsing' = 'parsing',
  'minted' = 'minted',
  'registration' = 'registration',
  'registered' = 'registered',
  'deprecated' = 'deprecated',
  'failed' = 'failed',
}

export enum TypeStage {
  prepare,
  checked,
  detected,
  watermarked,
  minting,
  minted,
  failed,
}
