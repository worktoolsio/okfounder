// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
require('dotenv').config();

module.exports = {
  async headers() {
    return [
      {
        // mathching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@apiFunctions': path.resolve(__dirname, 'apiFunctions'),
      '@constants': path.resolve(__dirname, 'constants'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@redirects': path.resolve(__dirname, 'redirects'),
      '@customTypes': path.resolve(__dirname, 'customTypes'),
      '@uiAssets': path.resolve(__dirname, 'uiAssets'),
      '@uiComponents': path.resolve(__dirname, 'uiComponents'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@views': path.resolve(__dirname, 'views'),
      '@root': path.resolve(__dirname, ''),
    };

    config.module.rules.push({
      test: /\.pcss$/i,
      exclude: /node_modules/,
      use: {
        loader: 'pcss-loader',
        options: {
          minified: true,
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  poweredByHeader: false,
  target: 'serverless',
  trailingSlash: false,
};
