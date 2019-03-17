const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();
const config = require('dotenv').config().parsed;

const proxyMiddleware = proxy('/', {
  target: config.DND_BEYOND_URL,
  changeOrigin: true,
  protocolRewrite: true,
  onProxyRes(proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = config.SITE_URL;
  }
});

app.use(proxyMiddleware);

app.listen(config.API_PORT, () =>
  console.log(`Listening on port ${config.API_PORT}!`)
);
