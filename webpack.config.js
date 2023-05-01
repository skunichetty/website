const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
    entry: "./src/static/js/main.js",
    output: {
        path: path.resolve(__dirname, "dist/static/"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [autoprefixer],
                            },
                        },
                    },
                    { loader: "sass-loader" },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin({ parallel: true })],
    },
};
