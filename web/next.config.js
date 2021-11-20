module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // proxy api and auth requests to the backend server
        // TODO: Don't do this in production
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
        {
          source: '/auth/:path*',
          destination: 'http://localhost:3001/auth/:path*',
        },
      ],
      afterFiles: [
        {
          source: '/k/:id/:slug',
          destination: '/k/:id',
        },
      ],
    };
  },
};
