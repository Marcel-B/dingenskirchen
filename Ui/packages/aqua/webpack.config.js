const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const deps = require("./package.json").dependencies;
module.exports = (env) => {
    return {
        entry: './src/index',
        output: {
            publicPath: env === 'prod' ? "http://localhost:9000/" : "http://localhost:3007/",
        },

        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        },

        devServer: {
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
                        loader: "ts-loader",
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
                    "ts-control": env === 'prod' ? "controls@http://localhost:3080/remoteEntry.js" : "controls@http://localhost:3079/remoteEntry.js",
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
    }
};
