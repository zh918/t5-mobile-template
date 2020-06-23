// const webpack = require('webpack')
const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

// 输出跟文件夹名称
const dist_name = 'dist'

module.exports = { 
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    path: path.resolve(__dirname, '../', dist_name),
    publicPath: '/',
    chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js'),
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    alias: {
      '@': path.join(__dirname, '../', 'src')
    }
  },
  module: {
    rules: [ 
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        include: [ path.join(__dirname, 'src') ],
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [ 'vue-loader' ]
      },
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            query: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("postcss-import")(),
                require("postcss-cssnext")({
                  features: {
                    customProperties: { warnings: false }
                  }
                }),
                require("postcss-font-magician")()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              prependData: '@import "@/style/auto-view.scss";'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [ 
          {
            loader: 'file-loader', 
            options: {
              name: "[name]-[hash].[ext]",
              outputPath: 'static/assets/' 
              // publicPath: path.posix.join('static','assets')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "[name]-[hash].[ext]",
              outputPath: 'static/assets/' 
            }
          }
        ]
      }  
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        "styles-compiled": {
          name: "styles-compiled",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
            
    }
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.posix.join('static', 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join('static', 'css/[id].[contenthash].css')
    }), 
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: path.resolve(__dirname, '../', 'entry/admin/', 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
         
  ]
};
