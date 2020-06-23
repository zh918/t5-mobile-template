process.env.NODE_ENV = 'prod'

const ora = require('ora')
// const rm = require('rimraf')
// const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack') 
const webpackConfig = require('./webpack.build.config')

console.log(chalk.cyan('  正式环境开始构建\n'))
const spinner = ora('building for production...')
spinner.start()
 
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) {
    throw err 
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  正式环境构建完成\n'))
})
