
// контекст с помощью модуля PATH для слежениея за изменениями в нутри корневой папки
const path = require('path')
// очищение папки dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// работа с Html
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Определение в каком режиме сборки мы сейчас находимся
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      // rules можно добовлять options, что бы не выносить в отдельный файл, как описано в док.
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}
// экспортируем js обект который является конфигурацией для webpack
//  node.js это делается с помощью команды exports
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'], // точка входа
  output: {
    filename: filename('js'), // файл в котором будут находится все наши скрипты js, хеширование  для того что бы скачивалась всегда актуальная версия
    path: path.resolve(__dirname, 'dist'), // папка в которой будет находится bundele.js
  },
  resolve: {
    extensions: ['.js'],
    // example: import '../../../../core/Component' === '@core/Component'
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html', // шаблон для html, точка входа
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}

