// minimal config webpack 5
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //плагин для обработки css
const HTMLWebpackPlugin = require('html-webpack-plugin'); //плагин для собирания html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин для удаления папки дист перед собиранием проекта

module.exports = {
  entry: { main: './src/main.js' },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      /**
       * {
       * test: /\.YOUR_FILE_EXTENSION$/, //расширение для файла на который распространяется loader
       * exclude: /SOMETHING THAT IS THAT EXTENSION BUT SHOULD NOT BE PROCESSED/,
       * use: {
       *    loader: "loader for your file extension or a group of loaders"
       * }
       * }
       */
      {
        test: /\.js$/, //все файлы с .js
        exclude: /node_modules/, //кроме node_modules
        use: {
          loader: 'babel-loader', //использовать babel-loader
        },
      },
      {
        test: /\.css|scss$/,
        // exclude: /node_modules/, //в node_modules нет .css файлов
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HTMLWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};
