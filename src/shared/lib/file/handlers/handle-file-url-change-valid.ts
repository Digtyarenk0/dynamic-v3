import * as yup from 'yup';

import { directLinkValidate } from 'shared/lib/url/url-support';
import { isGoogleDriveLink, isIPFSHash, isOpenSeaUrl, isRaribleUrl } from 'shared/lib/validators/validators';

export const YupHandleFileUrlValidation = yup.string().test({
  test(v, ctx) {
    if (!v) return true;
    if (isIPFSHash.test(v) || isGoogleDriveLink(v)) return true;
    const urlError = directLinkValidate(v);
    if (urlError) return ctx.createError({ message: urlError });
    return true;
  },
});

export const YupHandleFileUrlCheckValidation = yup.string().test({
  test(v, ctx) {
    if (!v) return true;
    if (isIPFSHash.test(v) || isRaribleUrl(v) || isOpenSeaUrl(v) || isGoogleDriveLink(v)) return true;
    const urlError = directLinkValidate(v);
    if (urlError) return ctx.createError({ message: urlError });
    return true;
  },
});
