process.env.NODE_ENV = 'dev';

const config = {
  dist_name: 'dist',
  port: 9000,
  isOpen: false
}

const ora = require('ora')
// const rm = require('rimraf')
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack') 
const express = require('express')
const webpackConfig = require('./webpack.dev.config')
const app = express()
   
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

const staticPath = path.posix.join(path.resolve(__dirname,'../',config.dist_name), '/')

app.use(express.static(staticPath))
const uri = `http://localhost:${config.port}`

devMiddleware.waitUntilValid(function () {
  console.log(chalk.cyan('  debugger环境开始构建\n'))
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  
  if (config.isOpen) {
    opn(uri)
  }
})




