module.exports = {
  publicPath: './',
  // publicPath: '../static/',
  devServer: {
    proxy: {
      '': {
        // target: 'http://10.8.0.12:8080/',
        target:'http://10.8.0.120:8022',  //sy
        // target:"http://10.8.0.10:8080",
        // target:"http://localhost:8080",
        // target:'http://172.31.0.72:8080',  //mfy 
        // target:'http://10.8.0.101:8080',
        // target: 'https://10.8.0.1:8443/',  //cd\
        // target:'http://10.8.0.120:8010/',
      
        // target:'https://10.8.0.105:8443/',   //jx
        // target:'http://172.26.1.15:8080',
        // target:'https://10.0.8.6:8443',   // fw  admin   123123
        // target:'https://10.8.0.105:8443', 
        // target:'http://10.8.0.5:8080',   //zx   admin   123446
        // target: 'http://10.8.0.5:8080',
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
  }

}
