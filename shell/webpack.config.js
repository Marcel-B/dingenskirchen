const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;

const deps = require("./package.json").dependencies;
module.exports = {
    output: {
        publicPath: "http://localhost:3030/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3030,
        historyApiFallback: true,
    },

    module: {
        rules: [{
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "shell",
            filename: "remoteEntry.js",
            remotes: {
                bookomat: "bookomat@http://localhost:3000/remoteEntry.js"
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
    ],
};