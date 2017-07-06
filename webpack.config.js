const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const app = [
  `webpack-dev-server/client?http://${host}:${port}`,
  './App.jsx'
];

module.exports = {
  // this is the path to your source files
  context: path.join(__dirname, 'src'),
  // this is the first file to be executed
  entry: {
    app
  },
  // local dev server configurations
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: './docs',
    publicPath: '/',
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    },
    stats: {
      colors: true
    }
  },
  // two plugins we're using. one copies images, html & css
  // from the src directory to the docs folder
  plugins: [
    new CopyWebpackPlugin([
      // { from: 'images', to: 'images' },
      { from: 'index.html' }
    ]),
    // this plug reloads the browser with every code change
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    // this loader uses babel to transpile our JS code
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0'
          ]
        }
      },
      {
        test: /\.sass$/,
        loader: 'style-loader'
      },
      {
        test: /\.sass$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      },
      {
        test: /\.sass$/,
        loader: 'sass-loader'
      }
    ]
  },
  // the JS file that's compiled from the JSX files
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'docs')
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};
