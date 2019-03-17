const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();

require('dotenv').config();

const proxyMiddleware = proxy('/', {
  target: process.env.DND_BEYOND_URL,
  changeOrigin: true,
  protocolRewrite: true,
  onProxyRes(proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = process.env.SITE_URL;
  }
});

app.use(proxyMiddleware);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on port ${process.env.PORT || 3000}!`)
);
