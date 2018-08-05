const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs')
var glob = require("glob");
let plugins = [];

glob.sync("./src/modules/**.js").forEach(item => {
    plugins.push(item.replace('./src/modules/', '').replace('.js', ''));
});

const config = {
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

const baseConfig = Object.assign({}, config, {
    entry: {
        "base": "./entry.js",
        "base.min": "./entry.js",
    },
    output: {
        path: __dirname + "/dist/",
        library: "Base",
        libraryTarget: "umd",
        filename: "[name].js",
    },
})


function createModulesConfig(pluginName) {
    let config = Object.assign({}, config, {
        entry: {},
        output: {
            path: __dirname + "/dist/modules",
            library: pluginName,
            libraryTarget: "umd",
            filename: "[name].js",
        },
    })

    config.entry[pluginName] = `./src/modules/${pluginName}.js`
    config.entry[pluginName + ".min"] = `./src/modules/${pluginName}.js`

    return config
}

let configsArray = []
configsArray.push(baseConfig)
//plugins.forEach(item => {
//    configsArray.push(createModulesConfig(item))
//})

module.exports = configsArray
