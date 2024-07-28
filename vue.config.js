const path = require('path');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack (config) {
    // Remove existing SVG rule which uses file-loader
    config.module.rules.delete('svg')

    // Use our loader instead
    config.module.rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')
    
      // Add alias for @assets
      config.resolve.alias
      .set('@assets', path.resolve(__dirname, 'src/assets'));
  }
})
