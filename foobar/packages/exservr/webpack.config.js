const path = require('path');
const nodeExternals = require('webpack-node-externals');

const deps = require("./package.json").dependencies;

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  externals: [nodeExternals()],
  watch: NODE_ENV === 'development',
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};