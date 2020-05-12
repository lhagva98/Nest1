const dotenv = require("dotenv").config();
const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "production",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    output: {
        path: path.resolve(__dirname,"./public"),
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
                "NODE_ENV": "production",
                ... dotenv.parsed
            })
        })
    ]
};