module.exports = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  publicExcludes: ['!noprecache/**/*'],
  publicExcludes: [
    '!.htaccess',
    '!web.config',
  ],
  buildExcludes: [/middleware-manifest.json$/],
  dynamicStartUrl: '/',
  dynamicStartUrlRedirect: '/offline',
  reloadOnOnline: true,
  scope: '/',
  sw: 'service-worker.js',
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    image: '/fallback-image.png',
    document: '/offline',
  },
};
