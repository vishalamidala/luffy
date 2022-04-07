import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '​/api',
    createProxyMiddleware({
      target: 'http://siteurl1.com',
      changeOrigin: true,
    })
  );
};
