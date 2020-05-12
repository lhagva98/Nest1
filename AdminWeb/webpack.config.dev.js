const dotenv = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    output: {
        filename: "bundle.js",
        chunkFilename: "chunk-[id].js"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },{
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader", options: { sourceMap: true } },
                ]
            },{
                test: /\.css$/,
                use:[
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify({
                "NODE_ENV": "development",
                ... dotenv.parsed
            })
        })
    ]
};