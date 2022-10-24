const path = require('path');
module.exports = {
  
  /* configureWebpack: {
    resolve: {
      alias: {
        'assets': 'src/assets',
        'common': 'src/common',
        'components': 'src/components',
        'network' : 'src/network',
        'router' : 'src/router',
      }
    }
  }, */
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', path.join(__dirname,'src/assets'))
      .set('common', path.join(__dirname,'src/common'))
      .set('components', path.join(__dirname,'src/components'))
      .set('network', path.join(__dirname,'src/network'))
      .set('router', path.join(__dirname,'src/router'))
      .set('views', path.join(__dirname,'src/views'))
  },
   transpileDependencies: true
}
