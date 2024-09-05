export const AppRoutes = {
  root: '/',
  admin: '/admin',
  billing: '/billing',
  home: '/home',
  privacy: '/privacy',
  terms: '/terms',
  protect: {
    root: '/protect',
    watermark: {
      single: '/protect/watermark/single',
      series: '/protect/watermark/series',
    },
  },
  check: {
    file: '/check/file',
    nft: '/check/nft',
  },
  pricing: '/pricing',
  watermarks: '/watermarks',
  item: '/item/:id',
  transactions: '/transactions',
  requests: '/requests',
};
