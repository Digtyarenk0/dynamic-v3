import { Trans } from '@lingui/macro';
import { useEffect } from 'react';

interface ButtonDownloadGoogleProps {
  src: string;
  filename: string;
  sitename?: string;
}

export const ButtonDownloadGoogle = (props: ButtonDownloadGoogleProps) => {
  const { src, filename, sitename = 'Watermarked' } = props;

  useEffect(() => {
    // @ts-ignore
    window?.gapi.savetodrive.go('container');
  }, []);

  return (
    <div id="container">
      <div className="g-savetodrive" data-src={src} data-filename={filename} data-sitename={sitename}>
        <p className="w-[81px] h-[27px]">
          <Trans>Loading...</Trans>
        </p>
      </div>
    </div>
  );
};
