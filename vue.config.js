
var proEnv = require('./config/pro.env');  // 生产环境
var uatEnv = require('./config/uat.env');  // 测试环境
var devEnv = require('./config/dev.env');  // 本地环境
const env = process.env.NODE_ENV;
let target = '';
// 默认是本地环境
if(env==='production'){  // 生产环境
  target = proEnv.hosturl;
}else if(env==='test'){ // 测试环境
  target = uatEnv.hosturl;
}else{  // 本地环境
  target = devEnv.hosturl;
}



module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
      port: 3880,
      host: 'localhost',
      https: false,
      hotOnly: false,
      disableHostCheck: true,
      proxy: {
          '/api':{
              target: target,
              ws: true,
              changeOrigin: true,
              // pathRewrite: {
              //     '^/api':''
              // }
          }
      }
      // proxy: proxyObj, // string | Object
  },
  lintOnSave: false,
  productionSourceMap: true,   // true => 会过滤.map 文件 。不利于暴露问题点 
}