const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("./webpack.config")

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: config.devServer.contentBase,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  quiet: true
}).listen(3000, "localhost", function(err, result) {
  if (err) {
    return console.log(err)
  }

  console.log("Listening at http://localhost:3000/")
})
