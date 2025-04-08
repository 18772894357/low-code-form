const { defineConfig } = require('@vue/cli-service')
const CssGeneratorPlugin = require('css-generator-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '/src/components/HelloWorld.vue': '/patchs/components/HelloWorld.vue'
      },
    },
    plugins: [
      new CssGeneratorPlugin({
        colors: {
          "link": "#2F54EB",
          "info": "#91D5FF",
          "checkBlue": "#E6F7FF"
        }, // 颜色配置
        dirPath: 'src', // 需要扫描的目录
        generate: 'src/style/auto.css', // 生成文件位置
        type: 'vue', // 项目类型 vue|d-mini-program
        unit: 'px', // 默认单位
        important: false,
      })
    ]
  },
  chainWebpack: config => {
    // config.module
    //   .rule('less')
    //   .test(/\.less$/)
    //   .use('style-loader')
    //   .loader('style-loader')
    //   .end()
    //   .use('css-loader')
    //   .loader('css-loader')
    //   .end()
    //   .use('less-loader')
    //   .loader('less-loader')
    //   .end();
  }
})
