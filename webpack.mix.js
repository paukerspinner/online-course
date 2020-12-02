const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/index.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
              exclude: /node_modules/
            }
          ]
        },
        resolve: {
          extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
      });

mix.browserSync({proxy: '127.0.0.1:8000'});