const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event || 'start';

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    'index.js': './src/index.jsx',
    'style.css': './src/style.css'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    },{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },]   
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  node: { "fs": false }
};

const development = {
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

const production = {
  output: {
    publicPath: '/dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __DEVELOPMENT__: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

if (TARGET === 'start') {
  module.exports = merge(development, common);
} else if (TARGET === 'build') {
  module.exports = merge(production, common);
}
