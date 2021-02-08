/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:53:33
 * @LastEditTime: 2021-02-08 16:50:26
 * @LastEditors: cxf
 * @Description:
 * @FilePath: /jewelry-shop/admin/vue.config.js
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "assets",
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "后台管理系统",
    },
  },
  devServer: {
    proxy: {
      "/admin": {
        target: "http://localhost:7001/",
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("swf")
      .test(/\.swf$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
      });
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/assets/less/ant.less"), resolve("src/assets/less/mixins.less")],
    },
  },
};
