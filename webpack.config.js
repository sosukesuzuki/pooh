/* eslint-disable */
const CopyPlugin = require('copy-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const MODE = process.env.NODE_ENV || 'development';
const DEV = MODE === 'development';

const copyRules = [
  {
    from: __dirname + '/src/index.html',
    to: __dirname + '/dist/index.html',
  },
];

module.exports = {
  mode: MODE,
  devtool: DEV ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    globalObject: 'self',
    filename: '[name].js',
    chunkFilename: '[name].[id].[contenthash].js',
  },
  optimization: {
    minimize: !DEV,
    minimizer: DEV ? [] : [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.w\.ts$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              publicPath: process.env.ASSET_HOST || '/',
              inline: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [new CopyPlugin(copyRules), new WorkerPlugin()],
};
