const currentTask = process.env.npm_lifecycle_event
if (currentTask != "start") {
  const path = require("path")
  const { CleanWebpackPlugin } = require("clean-webpack-plugin")
  const MiniCssExtractPlugin = require("mini-css-extract-plugin")
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
  const HtmlWebpackPlugin = require("html-webpack-plugin")
  const fse = require("fs-extra")

  const postCSSPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("postcss-hexrgba"), require("autoprefixer")]

  class RunAfterCompile {
    apply(compiler) {
      compiler.hooks.done.tap("Copy Images", function () {
        fse.copySync("./app/assets/images/", "./dist/assets/images/")
        fse.copySync("./app/assets/editor-style-post.css", "./dist/editor-style-post.css")
      })
    }
  }

  let cssConfig = {
    test: /\.css$/i,
    use: [
      {
        loader: "css-loader",
        options: { url: true }
      },
      {
        loader: "postcss-loader",
        options: { postcssOptions: { plugins: postCSSPlugins } }
      }
    ]
  }

  let fileConfig = {
    test: /\.(gif|svg|jpg|png)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
      context: "app/"
    }
  }

  let pages = fse
    .readdirSync("./app/")
    .filter(function (file) {
      return file.endsWith(".html")
    })
    .map(function (page) {
      return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
      })
    })

  let config = {
    entry: "./app/assets/scripts/App.js",
    context: path.resolve(__dirname),
    plugins: pages,
    module: {
      rules: [
        cssConfig,
        fileConfig,
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        }
      ]
    }
  }

  if (currentTask == "dev") {
    cssConfig.use.unshift("style-loader")
    config.output = {
      filename: "bundled.js",
      path: path.resolve(__dirname, "app")
    }
    config.devServer = {
      watchFiles: "./app/**/*.html",
      static: {
        directory: path.join(__dirname, "app")
      },
      hot: true,
      port: 3001,
      host: "0.0.0.0"
    }
    config.mode = "development"
  }

  if (currentTask == "build") {
    cssConfig.use.unshift({ loader: MiniCssExtractPlugin.loader, options: {} })
    config.output = {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    }
    config.mode = "production"
    config.optimization = {
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()]
    }
    config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "style.css" }), new RunAfterCompile())
  }

  if (currentTask == "start") {
    config.mode = "development"
  }

  module.exports = config
}
