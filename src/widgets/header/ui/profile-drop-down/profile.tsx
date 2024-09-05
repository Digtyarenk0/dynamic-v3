import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { t } from '@lingui/macro';
import cs from 'classnames';
import React, { useCallback, useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { useWallet } from 'app/providers/wallet';
import { AppRoutes } from 'app/router/route-config';

import CheckSVG from 'shared/assets/icons/check.svg';
import { FileUtils } from 'shared/lib/file';
import { Tip, Text } from 'shared/ui';

import { selectUserIsVeryfied, selectUseEmail } from 'entities/user/model/selectors/userSelectors';

import { signOutUserAction } from 'features/authorization/model/service/sign-out';

import styles from './profile.module.scss';

interface Props {
  walletAddress: string;
  setDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  balance?: string;
}

export const ProfileDropDownContent = (porps: Props) => {
  const { walletAddress, balance, setDropDownOpen } = porps;
  const { connector } = useWallet();
  const { setShowDynamicUserProfile } = useDynamicContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIsVeryfied = useSelector(selectUserIsVeryfied);
  // const userVerifyStatus = useSelector(selectUserVerifyStatus);
  const userEmail = useSelector(selectUseEmail);

  const shrotedWalletAddress = useMemo(() => FileUtils.middleNameCut(walletAddress, 7, 4), [walletAddress]);

  const close = useCallback(() => setDropDownOpen(false), []);
  const openDynamic = () => setShowDynamicUserProfile(true);
  const toBillingPage = () => {
    close();
    navigate(AppRoutes.billing, { relative: 'route' });
  };
  const toReqPage = () => {
    close();
  };
  const logout = () => {
    close();
    connector.deactivate();
    dispatch(signOutUserAction.call());
  };

  return (
    <div className="pt-6 w-[328px]">
      <div className="px-6">
        <div className="flex items-center">
          <Tip content={userEmail}>
            <div>
              <Text
                type="s24px-h26px"
                className="!text-[16px] block w-fit max-w-[260px] overflow-hidden text-ellipsis line-clamp-1"
                color="primary"
                family="pt-bold"
                text={userEmail}
              />
            </div>
          </Tip>
          {userIsVeryfied && (
            <Tip content={t`Verified`}>
              <div>
                <CheckSVG fill="#3D83F3" className="w-4 h-4 ml-[6px]" viewBox="0 0 20 20" />
              </div>
            </Tip>
          )}
        </div>
        <div className="flex items-center mt-1">
          <Text type="s12px-h18px" color="grey" family="inter-medium" className="mt-1" text={shrotedWalletAddress} />
          <CopyToClipboard text={walletAddress}>
            <button className={styles.token_copy} />
          </CopyToClipboard>
        </div>
      </div>
      {/* TODO: Return verify block */}
      {/* <VerifyProfileBlock status={userVerifyStatus} /> */}
      <div className={userIsVeryfied ? 'mt-8' : ''}>
        <button className="w-full" onClick={openDynamic}>
          <Text
            type="s16px-h24px"
            color="primary"
            family="inter-regular"
            className={styles.link}
            text={t`Dynamic Profile`}
          />
        </button>
        <NavLink to={AppRoutes.watermarks} onClick={close}>
          <Text
            type="s16px-h24px"
            color="primary"
            family="inter-regular"
            className={styles.link}
            text={t`My Watermarks`}
          />
        </NavLink>
        <NavLink to={AppRoutes.transactions} onClick={close}>
          <Text
            type="s16px-h24px"
            color="primary"
            family="inter-regular"
            className={styles.link}
            text={t`Transactions`}
          />
        </NavLink>
        <NavLink to={AppRoutes.requests} onClick={toReqPage}>
          <Text type="s16px-h24px" color="primary" family="inter-regular" className={styles.link} text={t`Requests`} />
        </NavLink>
      </div>
      <div className={cs('mt-4 hover:bg-grey-light duration-[0.2s]', styles.billing)}>
        <NavLink to={AppRoutes.billing} onClick={toBillingPage}>
          <div className="px-6 py-4 flex justify-between">
            <Text type="s16px-h24px" color="primary" family="inter-regular" text={t`Balance & Billing`} />
            <Text
              type="s16px-h24px"
              color="primary"
              family="inter-semi-bold"
              className="max-w-[130px] overflow-hidden text-ellipsis"
              text={balance}
            />
          </div>
        </NavLink>
      </div>
      <div onClick={logout} className="px-6 py-4 hover:bg-grey-light duration-[0.2s] cursor-pointer">
        <Text type="s16px-h24px" color="primary" family="inter-regular" text={t`Logout`} />
      </div>
    </div>
  );
};
