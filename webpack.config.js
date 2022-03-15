const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        "regenerator-runtime/runtime.js",
        path.resolve(__dirname, "src", "index.jsx"),
    ],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(jsx|js)$/,
                exclude: "/node_modules",
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                exclude: "/node_modules",
                use: ["style-loader", "css-loader", "postcss-loader"], // Note that postcss loader must come before sass-loader
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        historyApiFallback: true,
        client: {
            overlay: {
                warnings: false,
                errors: true,
            },
        },
        port: 8080,
        hot: true,
    },
};
