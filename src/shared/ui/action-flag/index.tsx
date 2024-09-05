import { Trans, t } from '@lingui/macro';
import cs from 'classnames';

import { Text } from '../text';
import { Tip } from '../tip';

import styles from './action-flag.module.scss';

type actionTypes = 'check' | 'checked' | 'mint' | 'register' | 'download' | 'unknown';
type methodType = 'check' | 'protect';

export interface ActionFlagProps {
  action: actionTypes;
  tip: string | null;
  onClick: () => void;
  method?: methodType;
  className?: string;
}

export const ActionFlag = (props: ActionFlagProps) => {
  const { className, action = 'check', method = 'protect', tip = null, onClick } = props;
  switch (action) {
    case 'checked': {
      const text = method === 'check' ? t`Check` : t`Protect`;
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, 'bg-green-alert w-[121px]')}>
            <Text
              family="inter-semi-bold"
              align="center"
              color="white"
              type="s12px-h18px"
              className="my-[4px]"
              text={text}
            />
          </button>
        </Tip>
      );
    }
    case 'check':
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, 'bg-grey-light w-[121px]')}>
            <Text
              family="pt-bold"
              align="center"
              color="grey"
              type="s12px-h18px"
              className="my-[4px] tracking-[0.75px] "
              text={t`View`}
            />
          </button>
        </Tip>
      );
    case 'mint':
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, 'bg-green-alert w-[121px]')}>
            <Text
              family="inter-semi-bold"
              color="white"
              align="center"
              type="s12px-h18px"
              className="my-[4px]"
              text={t`Create NFT`}
            />
          </button>
        </Tip>
      );
    case 'register':
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, 'bg-green-alert w-[121px]')}>
            <Text
              family="inter-semi-bold"
              color="white"
              align="center"
              type="s12px-h18px"
              className="my-[4px]"
              text={t`Register`}
            />
          </button>
        </Tip>
      );
    case 'download':
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, 'bg-grey-light')}>
            <Trans>Download</Trans>
          </button>
        </Tip>
      );
    default:
      return (
        <Tip content={tip}>
          <button onClick={onClick} className={cs(className, styles.action, styles.action)}>
            {/* <i className={styles.unknown_flag} /> */}X
          </button>
        </Tip>
      );
  }
};
