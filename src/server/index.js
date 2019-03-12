const proxy = require('http-proxy-middleware');
const express = require('express');
const config = require('../config');

const app = express();

const proxyMiddleware = proxy('/', { 
  target: config.dndBeyondURL,
  changeOrigin: true,
  protocolRewrite: true,
  onProxyRes(proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = config.host;
  }
});

app.use(proxyMiddleware);

app.listen(config.apiPort, () => 
  console.log(`Listening on port ${config.apiPort}!`)
);
