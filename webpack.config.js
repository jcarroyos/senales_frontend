let webpack = require("webpack");
let path = require("path");
//const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
    entry: "./src/main.js",

    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist",
        filename: "build.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,

                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function() { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader', // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(scss|less)$/,
                loader: "less-loader"
             },
            {
                test: /\.vue$/,

                loader: "vue-loader"
            },
            {
                test: /\.js$/,

                loader: "babel-loader",

                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,

                loader: "file-loader",

                options: {
                    name: "[name].[ext]?[hash]"
                }
            },
            
            {
                test: /\.(mp3)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'media/audio/[name].[ext]',
                },
            },
            {
                test: /\.(mp4)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'media/video/[name].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            }
        ]
    },
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            mapboxgl: 'mapbox-gl'
          })
        ]
      },
    loaders: {
       less: 'vue-style-loader!css-loader?sourceMap!less-loader?sourceMap'
  },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js",
           //'src': path.resolve(__dirname, './scss/inicio.less')
           
        },
        extensions: ["*", ".js", ".vue", ".json",'.scss','.less','.eot', '.ttf', '.svg', '.woff']
    },

    devServer: {
        historyApiFallback: true,

        noInfo: true,

        overlay: true
    },

    performance: {
        hints: false
    },

    devtool: "#eval-source-map",
};

if (process.env.NODE_ENV === "production") {

    module.exports.devtool = "#source-map";

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        })
    ]),
    
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
}