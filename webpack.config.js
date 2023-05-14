const path = require("path");

   module.exports = {
     entry: "./src/index.js",
     output: {
       path: path.join(__dirname, "/dist"),
       filename: "bundle.js"
     },
     module: {
       rules: [
         {
           test: /\.scss$/,
           use: [
             "style-loader",
             "css-loader",
             "sass-loader"
           ]
         },
         {
           test: /\.(js)$/,
           exclude: /node_modules/,
           use: ["babel-loader"]
         }
       ]
     }
   };