import { Trans, t } from '@lingui/macro';
import classNames from 'classnames';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { useWallet } from 'app/providers/wallet';

import HourglassSVG from 'shared/assets/icons/account-content/hourglass-start.svg';
import XCircleSVG from 'shared/assets/icons/account-content/x-circle.svg';
import BackSVG from 'shared/assets/icons/back.svg';
import BGBottomMidle from 'shared/assets/icons/verify/bottom_midle.svg';
import BGBottomRight from 'shared/assets/icons/verify/bottom_right.svg';
import VerifySVG from 'shared/assets/icons/verify/refresh.svg';
import ShieldSVG from 'shared/assets/icons/verify/shield-check.svg';
import BGTopLeft from 'shared/assets/icons/verify/top_left.svg';
import BGTopRight from 'shared/assets/icons/verify/top_right.svg';
import { Text } from 'shared/ui';

import { useAuthorization } from 'features/authorization/model/hooks/useAuthorization';
import { userCheckVerification } from 'features/authorization/model/service/user-check-veriffication';
import { userToVerificationAction } from 'features/authorization/model/service/user-to-verification';

import { VerifyBlockProps } from '../types/props';

const baseStyle = 'flex items-center relative pt-6 pb-7 pr-10 pl-[25px] my-4 border-solid border-[6px]';

const NotVerify = () => {
  const dispatch = useDispatch();
  const { login } = useAuthorization();
  const { wallet } = useWallet();

  const openRegistrationIfLogout = async () => {
    if (wallet?.account) return;
    return login();
  };

  const refreshStatus = async () => {
    await openRegistrationIfLogout();
    userCheckVerification();
  };

  const verify = async () => {
    await openRegistrationIfLogout();
    dispatch(userToVerificationAction.call());
  };

  return (
    <div>
      <button type="button" className={classNames(baseStyle, 'border-[#FFE100]')} onClick={verify}>
        <ShieldSVG className="min-w-[120px] min-h-[120px] mr-10" />
        <div>
          <div className="flex items-center mb-2">
            <Text type="s18px-h24px" color="yellow" family="inter-semi-bold" text={t`Please, verify your identity`} />
            <BackSVG className="ml-3 stroke-[0.5px] rotate-180" stroke="#FFE100" fill="#FFE100" />
          </div>
          <Text
            type="s14px-h24px"
            color="grey"
            family="inter-medium"
            className="relative z-[1]"
            text={t`To protect your content from unauthorized use and ensure that only you have access to it, it is 
      important to verify your identity. By going through an identity verification process, you can safeguard
       your content and preserve your intellectual property.`}
          />
        </div>
        <BGTopLeft className="absolute top-0 left-28" fill="#FFE100" />
        <BGTopRight className="absolute top-0 right-32" fill="#FFE100" />
        <BGBottomMidle className="absolute bottom-0 right-64" fill="#FFE100" />
        <BGBottomRight className="absolute bottom-0 right-0" fill="#FFE100" />
      </button>
      <div className="flex justify-end w-full">
        <button type="button" className="flex" onClick={refreshStatus}>
          <VerifySVG className="mr-[6px]" />
          <Text align="right" type="s12px-h18px" color="primary" family="inter-medium" text={t`Reload status`} />
        </button>
      </div>
    </div>
  );
};

const Review = () => {
  const refreshStatus = () => userCheckVerification();

  return (
    <div>
      <div className={classNames(baseStyle, 'border-[#FFE100]')}>
        <HourglassSVG className="min-w-[120px] min-h-[120px] mr-9" viewBox="0 0 50 50" />
        <div>
          <Text
            type="s18px-h24px"
            color="yellow"
            family="inter-semi-bold"
            text={t`Verification under review`}
            className="mb-2"
          />
          <Text
            type="s14px-h24px"
            color="grey"
            family="inter-medium"
            text={t`We will review your submission and notify you once your identity has been confirmed. This process
       typically takes up to 5-10 minutes, but may take longer in some cases. Please note that you cannot 
       protect your content during the verification process.`}
          />
        </div>
        <BGTopLeft className="absolute top-0 left-28" fill="#FFE100" />
        <BGTopRight className="absolute top-0 right-32" fill="#FFE100" />
        <BGBottomMidle className="absolute bottom-0 right-64" fill="#FFE100" />
        <BGBottomRight className="absolute bottom-0 right-0" fill="#FFE100" />
      </div>
      <div className="flex justify-end w-full">
        <button type="button" className="flex" onClick={refreshStatus}>
          <VerifySVG className="mr-[6px]" />
          <Text align="right" type="s12px-h18px" color="primary" family="inter-medium" text={t`Reload status`} />
        </button>
      </div>
    </div>
  );
};

const TestVerifyBlock = () => {
  const refreshStatus = () => userCheckVerification();

  return (
    <div className="flex justify-end w-full">
      <button type="button" className="flex" onClick={refreshStatus}>
        <VerifySVG className="mr-[6px]" />
        <Text align="right" type="s12px-h18px" color="primary" family="inter-medium" text={t`Reload status`} />
      </button>
    </div>
  );
};

const NotRecognized = () => {
  const dispatch = useDispatch();

  const refreshStatus = () => userCheckVerification();
  const verify = () => dispatch(userToVerificationAction.call());

  return (
    <div>
      <div className={classNames(baseStyle, 'border-accent')}>
        <XCircleSVG className="min-w-[80px] min-h-[72px] mr-9" viewBox="0 0 50 50" />
        <div className="z-[1]">
          <Text
            type="s18px-h24px"
            color="accent"
            family="inter-semi-bold"
            text={t`Couldn't verify your identity`}
            className="mb-2"
          />
          <div className="flex text-sm font-inter-Medium text-grey">
            <p>
              <Trans>Unfortunately, you have not been approved to continue protect your content. Please</Trans>
              <span className="text-blue underline cursor-pointer ml-1" onClick={verify}>
                <Trans>verify your identity again.</Trans>
              </span>
            </p>
          </div>
        </div>
        <BGTopLeft className="absolute top-0 left-28 opacity-[90%] z-0" fill="#FFBEC2" />
        <BGTopRight className="absolute top-0 right-32 opacity-[90%] z-0" fill="#FFBEC2" />
        <BGBottomMidle className="absolute bottom-0 right-64 opacity-[90%] z-0" fill="#FFBEC2" />
        <BGBottomRight className="absolute bottom-0 right-0 opacity-[90%] z-0" fill="#FFBEC2" />
      </div>
      <div className="flex justify-end w-full">
        <button type="button" className="flex" onClick={refreshStatus}>
          <VerifySVG className="mr-[6px]" />
          <Text align="right" type="s12px-h18px" color="primary" family="inter-medium" text={t`Reload status`} />
        </button>
      </div>
    </div>
  );
};

export const VerifyBlock = memo(({ status }: VerifyBlockProps) => {
  switch (status) {
    case 'not-verify':
      return <NotVerify />;
    case 'review':
      return <Review />;
    case 'not-recognized':
      return <NotRecognized />;
    case 'verify':
      return <TestVerifyBlock />;
    default:
      return <NotVerify />;
  }
});
