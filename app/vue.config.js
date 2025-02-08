const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../dist'),
  publicPath: process.env.NODE_ENV === 'production' ? '/astor/dist' : '/',
})
