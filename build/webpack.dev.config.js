const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
// const baseWebpackConfig = require('./webpack.base.happypack.config')

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: `"${process.env.NODE_ENV}"`} 
    })
  ]
});
