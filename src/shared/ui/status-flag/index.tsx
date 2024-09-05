import { t, Trans } from '@lingui/macro';
import cs from 'classnames';

import CheckSVG from 'shared/assets/icons/check.svg';
import FailSVG from 'shared/assets/icons/fail_red.svg';
import HourglassSVG from 'shared/assets/icons/hourglass.svg';
import LoadSVG from 'shared/assets/icons/load.svg';

import { Tip } from '../tip';

import { StatusFlagProps } from './index.types';
import styles from './status-flag.module.scss';

export const statusList = {
  uploaded: 'uploaded',
  payment: 'payment',
  pending: 'pending',
  checking: 'checking',
  watermarking: 'watermarking',
  minting: 'minting',
  registration: 'registration',

  checked: 'checked',
  detected: 'detected',
  watermarked: 'watermarked',
  minted: 'minted',
  registered: 'registered',
  deprecated: 'deprecated',
  failed: 'failed',
  success: 'success',
  unknown: 'unknown',
};

export const StatusFlag = ({ className, status = statusList.pending, isNFT, tip }: StatusFlagProps) => {
  switch (status) {
    case statusList.pending:
      return (
        <div className={cs(className, styles.status_flag, styles.pending)}>
          <LoadSVG />
          <Trans>pending</Trans>
        </div>
      );
    case statusList.checked:
      return (
        <Tip content={'Watermark not found.'}>
          <div className={cs(className, styles.status_flag, styles.checked)}>
            <CheckSVG fill="#3CD399" className="w-4 h-4" viewBox="0 0 20 20" />
            <Trans>non-watermarked</Trans>
          </div>
        </Tip>
      );
    case statusList.payment:
      return (
        <div className={cs(className, styles.status_flag, styles.deprecated)}>
          <HourglassSVG fill="#FFC700" />
          <Trans>payment</Trans>
        </div>
      );
    case statusList.detected: {
      if (!isNFT) {
        return (
          <Tip content={'A watermark has been found.'}>
            <div className={cs(className, styles.status_flag, styles.detected)}>
              <CheckSVG fill="#3D83F3" className="w-4 h-4" viewBox="0 0 20 20" />
              <Trans>detected</Trans>
            </div>
          </Tip>
        );
      }
      const isOriginal = isNFT === 'original';
      const msg = isOriginal ? t`Authentic NFT` : t`Fake NFT`;
      const style = isOriginal ? styles.detected : styles.fail;
      const ico = isOriginal ? (
        <CheckSVG fill="#3D83F3" className="w-4 h-4" viewBox="0 0 20 20" />
      ) : (
        <FailSVG fill="#FF4650" />
      );
      return (
        <Tip content={'A watermark has been found.'}>
          <div className={cs(className, styles.status_flag, style)}>
            {ico}
            <p>{msg}</p>
          </div>
        </Tip>
      );
    }
    case statusList.watermarked:
      return (
        <div className={cs(className, styles.status_flag, styles.success)}>
          <CheckSVG fill="#3CD399" className="w-4 h-4" viewBox="0 0 20 20" />
          <Trans>watermarked</Trans>
        </div>
      );
    case statusList.minted:
      return (
        <div className={cs(className, styles.status_flag, styles.success)}>
          <CheckSVG fill="#3CD399" className="w-4 h-4" viewBox="0 0 20 20" />
          <Trans>minted</Trans>
        </div>
      );
    case statusList.registered:
      return (
        <div className={cs(className, styles.status_flag, styles.success)}>
          <CheckSVG fill="#3CD399" className="w-4 h-4" viewBox="0 0 20 20" />
          <Trans>registered</Trans>
        </div>
      );
    case statusList.success:
      return (
        <div className={cs(className, styles.status_flag, styles.success)}>
          <CheckSVG fill="#3CD399" className="w-4 h-4" viewBox="0 0 20 20" />
          <Trans>success</Trans>
        </div>
      );
    case statusList.deprecated:
      return (
        <Tip content={'The request is not longer valid.'}>
          <div className={cs(className, styles.status_flag, styles.deprecated)}>
            <HourglassSVG fill="#FFC700" />
            <Trans>deprecated</Trans>
          </div>
        </Tip>
      );
    case statusList.failed:
      return (
        <Tip content={tip}>
          <div className={cs(className, styles.status_flag, styles.fail)}>
            <FailSVG fill="#FF4650" />
            <Trans>fail</Trans>
          </div>
        </Tip>
      );
    default:
      return (
        <div className={cs(className, styles.status_flag, styles.unknown)}>
          <FailSVG fill="#FF4650" />
          <Trans>unknown</Trans>
        </div>
      );
  }
};
