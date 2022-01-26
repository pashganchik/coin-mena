const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const SRC_DIR = __dirname + '/src';

module.exports = {
    entry: [SRC_DIR + '/index.tsx'],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]',
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: { minimize: true },
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        port: 3000,
    },
};
