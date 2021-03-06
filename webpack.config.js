// Don't forget to specify '--config' when you're using your own config file, or it'll just break
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('path');

let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
let libs = path.join(__dirname, '/libs/');

module.exports = {
    entry: {
        // Order matters here in vendor bundle (apparently)
        dist: path.resolve(__dirname, './src/game.js'),
        vendor: ['pixi', 'p2', 'phaser', 'react', 'recompose', 'redux', 'react-redux', 'wolfy87-eventemitter']
    },
    output: {
        // We do this ([name]) as we've got two entry points above (otherwise they'll fight against each other)
        // -> https://webpack.js.org/guides/code-splitting/
        // -> https://webpack.js.org/configuration/output/#output-filename
        filename: '[name].bundled.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // modules: [path.resolve(__dirname, 'libs')],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
            'p2': path.join(phaserModule, 'build/custom/p2.js'),
            'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
            'eventemitter': 'wolfy87-eventemitter'
        }
    },
    module: {
        rules: [
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundled.js'/* filename= */ }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: 'vendor'
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: false,
            minimize: false,
            output: {
                comments: false
            }
        })
    ],
    watch: true
};