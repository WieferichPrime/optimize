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
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', "sass-loader"]
      }
    ]
  }
};