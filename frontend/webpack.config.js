const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { DefinePlugin } = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2018',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|ico)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2018',
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    overlay: true,
    hot: true,
    port: '8082',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    module: 'empty'
  },
}
