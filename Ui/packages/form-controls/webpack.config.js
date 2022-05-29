const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = (env) => {
    return {
        output: {
            publicPath: env === 'prod' ? 'http://192.168.2.103:3080/' : 'http://localhost:3079/',
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        },

        devServer: {
            port: 3079,
        },

        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
            ],
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'controls',
                filename: 'remoteEntry.js',
                remotes: {},
                exposes: {
                    './DaCheckbox': './src/AppCheckbox.tsx',
                    './DaDatePicker': './src/AppDatePicker.tsx',
                    './DaRadioButton': './src/AppRadioButton.tsx',
                    './DaSelect': './src/AppSelect.tsx',
                    './DaTextInput': './src/AppTextInput.tsx',
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                    },
                },
            }),
            new HtmlWebPackPlugin({
                template: './src/index.html',
            }),
        ],
    }
};
