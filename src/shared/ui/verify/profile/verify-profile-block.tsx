import { t } from '@lingui/macro';
import classNames from 'classnames';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import HourglassSVG from 'shared/assets/icons/account-content/hourglass-start.svg';
// import ShieldSVG from 'shared/assets/icons/account-content/shield-check.svg';
import XCircleSVG from 'shared/assets/icons/account-content/x-circle.svg';
import ShieldSVG from 'shared/assets/icons/verify/shield-check.svg';
import { Text } from 'shared/ui';

import { userCheckVerification } from 'features/authorization/model/service/user-check-veriffication';
import { userToVerificationAction } from 'features/authorization/model/service/user-to-verification';

import { VerifyBlockProps } from '../types/props';

const baseStyle = 'flex items-center pt-4 pb-5 px-6 mt-4';

const NotVerify = () => {
  const dispatch = useDispatch();

  const verify = () => dispatch(userToVerificationAction.call());

  return (
    <button onClick={verify} className={classNames(baseStyle, 'bg-[#FFE100] bg-opacity-10')}>
      <ShieldSVG width={55} height={55} viewBox="0 0 110 110" className="mr-[19px]" />
      <div>
        <Text
          type="s12px-h18px"
          color="yellow"
          family="inter-semi-bold"
          className="!text-[12px]"
          text={t`Please, verify your identity`}
        />
        <Text
          type="s12px-h18px"
          color="grey"
          family="inter-medium"
          className="w-[211px]"
          text={t`To protect your content from unauthorized use and ensure that only you have access to it, it is important to verify your identity.`}
        />
      </div>
    </button>
  );
};

const Review = () => {
  const refreshStatus = () => userCheckVerification();

  return (
    <button onClick={refreshStatus} className={classNames(baseStyle, 'bg-yellow bg-opacity-5')}>
      <HourglassSVG className="mr-[19px]" />
      <div>
        <Text
          type="s12px-h18px"
          color="yellow"
          family="inter-semi-bold"
          className="!text-[12px]"
          text={t`Verification under review`}
        />
        <Text
          type="s12px-h18px"
          color="grey"
          family="inter-medium"
          className="w-[211px]"
          text={t`We will review your submission and notify you once your identity has been confirmed. This process typically takes up to 5-10 minutes.`}
        />
      </div>
    </button>
  );
};

const NotRecognized = () => {
  const dispatch = useDispatch();

  const verify = () => dispatch(userToVerificationAction.call());

  return (
    <button onClick={verify} className={classNames(baseStyle, 'bg-accent bg-opacity-5')}>
      <XCircleSVG className="mr-[19px]" />
      <div>
        <Text
          type="s12px-h18px"
          color="accent"
          family="inter-semi-bold"
          className="!text-[12px]"
          text={t`Couldn't verify your identity`}
        />
        <Text
          type="s12px-h18px"
          color="grey"
          family="inter-medium"
          className="flex w-[211px]"
          text={t`Unfortunately, you have not been approved to continue protect your content. Please verify your identity again.`}
        />
      </div>
    </button>
  );
};

export const VerifyProfileBlock = memo(({ status }: VerifyBlockProps) => {
  switch (status) {
    case 'not-verify':
      return <NotVerify />;
    case 'review':
      return <Review />;
    case 'not-recognized':
      return <NotRecognized />;
    case 'verify':
      return <div />;
    default:
      return <NotVerify />;
  }
});
