const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',	
//       changeOrigin: true,
//     })
//   );
// };
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://libertyrunners-app.com",
        changeOrigin: true,
      },
    },
  },
};