const path = require('path');
const {
    JAVASCRIPT_PATH,
    DEV_JAVASCRIPT_PATH
} = require(path.resolve(__dirname, './gulp/constants/paths'));
const {JAVASCRIPT_FILE} = require(path.resolve(__dirname, './gulp/constants/files'));

module.exports = {
    entry: path.resolve(__dirname, `${DEV_JAVASCRIPT_PATH}/${JAVASCRIPT_FILE}`),
    output: {
        path: path.resolve(__dirname, JAVASCRIPT_PATH),
        filename: JAVASCRIPT_FILE
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    mode: 'development'
};