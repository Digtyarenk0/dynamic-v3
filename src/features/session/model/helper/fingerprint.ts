import { load, hashComponents } from '@fingerprintjs/fingerprintjs';

export const fingerprintApp = () => {
  const fpPromise = load();
  return {
    async get(): Promise<string> {
      return fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          const empty = { value: null, duration: 0 };
          const components = {
            ...result.components,
            audio: empty,
            canvas: empty,
            colorDepth: empty,
            colorGamut: empty,
            contrast: empty,
            domBlockers: empty,
            plugins: empty,
            //
            touchSupport: empty,
            screenResolution: empty,
            screenFrame: empty,
            hdr: empty,
            //?? plugins: empty,
          };
          Object.keys(components).forEach((key) => {
            // @ts-ignore
            components[key].duration = 0;
          });
          const finger = hashComponents(components);
          return finger;
        });
    },
  };
};
