import { Trans, t } from '@lingui/macro';

import { Button, Text } from 'shared/ui';

interface ErrorBoundaryProps {
  error: Error | null;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export const ErrorBoundaryFallback = (props: ErrorBoundaryProps) => {
  const { error, resetErrorBoundary } = props;
  return (
    <div className="mt-24 flex justify-center">
      <div className="w-fit">
        <Text className="mb-4" type="s32px-h36px" family="pt-bold" color="green" text={t`Something went wrong:`} />
        <Text className="mb-4" type="s18px-h20px" family="inter-semi-bold" color="accent" text={error?.message} />
        <Button onClick={resetErrorBoundary}>
          <Trans>Reload</Trans>
        </Button>
      </div>
    </div>
  );
};
