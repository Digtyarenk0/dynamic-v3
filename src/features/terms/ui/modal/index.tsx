import { Trans } from '@lingui/macro';
import cs from 'classnames';
import { memo, useEffect, useRef, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useCookies } from 'react-cookie';

import { useModalContext } from 'app/providers/modal/modal-provider';

import { Button } from 'shared/ui';

import { Terms } from 'pages/terms';

import styles from './terms-modal.module.scss';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const PRIVACY_POLICY_COOKIE = 'watermarked-privacy-policy';

export const privacyPolicyEffectiveDateMainnet = 1696809600000;
export const termsServiceEffectiveDateMainnet = 1696809600000;

export interface IPrivacyPolicy {
  isAccepted: boolean;
  date: number;
}

export const TermsModal = memo(() => {
  const { modalData, closeModal } = useModalContext();
  const [_, setCookie] = useCookies([PRIVACY_POLICY_COOKIE]);
  const [buttonActive, setButtonActive] = useState(false);

  const handleSetPolicyCookie = (isAccepted: boolean) => {
    closeModal();
    setCookie(
      PRIVACY_POLICY_COOKIE,
      JSON.stringify({
        isAccepted,
        date: termsServiceEffectiveDateMainnet,
      }),
      {
        expires: new Date('2100-01-01'),
      },
    );
  };

  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!modalData || !target.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setButtonActive(true);
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [modalData]);

  return (
    <div className={cs(styles.uploader_container)}>
      <div className="max-h-[65vh] overflow-scroll mb-5">
        <Terms classNames="!w-[586px]" />
        <div ref={target} className="m-2 p-2" />
      </div>
      <div className="mb-6">
        <Button
          disabled={!buttonActive}
          theme={buttonActive ? 'green' : undefined}
          onClick={() => handleSetPolicyCookie(true)}
        >
          {buttonActive ? <Trans>Accept</Trans> : <Trans>Scroll down to accept</Trans>}
        </Button>
      </div>
    </div>
  );
});
