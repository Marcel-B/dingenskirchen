const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Dotenv = require('dotenv-webpack');


const deps = require("./package.json").dependencies;
module.exports = (_, {mode, env}) => {
    const envPath = mode ? `.env.${mode}` : '.env';

    return {
        entry: './src/index',
        output: {
            publicPath: env === 'prod' ? "http://192.168.2.103:9005/" : "http://localhost:3007/",
        },

        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        },

        devServer: {
            historyApiFallback: true,
            contentBase: './',
            hot: true,
            port: 3007,
        },

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
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },

        plugins: [
            new MomentLocalesPlugin(),

            new ModuleFederationPlugin({
                name: "starter",
                filename: "remoteEntry.js",
                remotes: {
                    "ts-control": env === 'prod' ? "controls@http://192.168.2.103:3080/remoteEntry.js" : "controls@http://localhost:3079/remoteEntry.js",
                },
                exposes: {},
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
            }),
            new Dotenv({
                path: envPath
            })
        ],
    }
};
