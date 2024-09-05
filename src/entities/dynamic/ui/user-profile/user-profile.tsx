import { DynamicUserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { FC, useEffect } from 'react';

const DynamicUserProfileForward: FC = () => {
  const { primaryWallet, setShowDynamicUserProfile } = useDynamicContext();

  useEffect(() => {
    // Close Dynamic profile after embed
    setShowDynamicUserProfile(false);
  }, []);

  return <>{primaryWallet?.isAuthenticated && <DynamicUserProfile />}</>;
};

export default DynamicUserProfileForward;
