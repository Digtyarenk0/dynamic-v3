import { t } from '@lingui/macro';
import { useDispatch } from 'react-redux';

import { ButtonText } from 'shared/ui';

import styles from './msg-signin.module.scss';

export const MessageComponent = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    // dispatch(signInAction.call());
  }; // TODO: SIGN
  return (
    <div className={styles.message_component}>
      <ButtonText onClick={signIn} text={t`Please sign in to get access to this page`} />
    </div>
  );
};
