const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs')
const modules = [
    'BaseComponent',
    'Component',
    'loadComponents',
    'createInstance',
    'removeComponents',
    'destroyInstance',
    'getComponentFromElement',
    'eventbus',
];

const defaultConfig = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'stage-0'],
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                include: /\.min\.js$/
            })
        ]
    }
}

const baseConfig = Object.assign({}, defaultConfig, {
    entry: {
        "gia": "./webpackEntries/entry.js",
        "gia.min": "./webpackEntries/entry.js",
    },
    output: {
        path: __dirname + "/dist/",
        library: "gia",
        libraryTarget: "umd",
        filename: "[name].js",
    },
})


function createModulesConfig(modulesName) {
    let config = Object.assign({}, defaultConfig, {
        entry: {},
        output: {
            path: __dirname + "/dist",
            library: modulesName,
            libraryTarget: "umd",
            filename: "[name].js",
        },
    })

    config.entry[modulesName] = `./webpackEntries/${modulesName}.js`
    config.entry[modulesName + ".min"] = `./webpackEntries/${modulesName}.js`

    return config;
}

let configsArray = []
configsArray.push(baseConfig)
modules.forEach(item => {
   configsArray.push(createModulesConfig(item))
})

module.exports = configsArray
