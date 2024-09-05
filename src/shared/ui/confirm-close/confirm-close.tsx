import { Trans, t } from '@lingui/macro';
import React from 'react';

import { Button, Text } from 'shared/ui';

export interface ConfirmClose {
  closeModalConfirm: () => void;
  back: () => void;
}

export const ConfirmClose = (props: ConfirmClose) => {
  return (
    <div>
      <Text
        className="mb-9 mt-6"
        family="inter-regular"
        color="primary"
        type="s16px-h18px"
        text={t`If you haven't saved your changes, they may be lost. Confirm your action by clicking "Confrirm" or stay on the page by clicking "Cancel".`}
      />
      <Button onClick={() => props.closeModalConfirm()} theme="green">
        <Trans>Confirm</Trans>
      </Button>
      <Button onClick={() => props.back()} theme="none" className="text-grey hover:text-white">
        <Trans>Cancel</Trans>
      </Button>
    </div>
  );
};
