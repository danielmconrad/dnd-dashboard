const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(proxy('/api', { 
  target: 'https://www.dndbeyond.com',
  changeOrigin: true,
  protocolRewrite: true,
  pathRewrite: function (path, req) { 
    return path.replace('/api', '') 
  }
}));

app.listen(port, () => console.log(`Listening on port ${port}!`));
