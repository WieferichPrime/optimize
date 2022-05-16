const sassRegex = /\.(scss|sass|css)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
module.exports = {
  entry: "./leadmanager/frontend/src/index.js",
  mode: "development",
  output: {
    filename: "./main.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: sassRegex,
        use: ['style-loader', 'css-loader', 'postcss-loader', "sass-loader"]
      },
      // {
      //   test: sassModuleRegex,
      //   use: 'sass-loader',
      // },
    ]
  }
};