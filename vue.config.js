module.exports = {
  publicPath: './',  // publicPath: '../static/',
  devServer: {
    proxy: {
      '': {
        // target:'http://192.168.10.38:5000/', //在长安
        // target:'http://172.31.0.229:5000/',  //五号楼
         target:'http://172.31.2.13:5000',    //在内网
        //target:'http://192.168.31.148:5000', //在家时
        // target:'http://192.168.10.78:5000/',
        //  target:'http://192.168.0.112:5000',
        // target:'http://192.168.10.179:5000',
        //target:'http://192.168.10.47:5000',
        ws: true,
        changeOrigin: true,
        // secure: false, // 如果是https接口，需要配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数  https:false
        pathRewrite: { '^': '' }
      }
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  },


}
