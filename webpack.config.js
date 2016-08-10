// webpack.config.js
var webpack = require('webpack');
var path = require('path');

var debug = process.env.NODE_ENV !== "production";

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
  	app: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './src/app.js'
    ],
    //Profile: './profile.js'
  },
  output: {
  	path: path.join(__dirname, 'public','javascripts'), // This is where images AND js will go
  	publicPath: 'http://0.0.0.0:8000/', // This is used to generate URLs to e.g. images
    filename: '[name].bundle.js'  // Template based on keys in entry above    
  },
  module: {
    loaders: [
      { 
      	test: /\.coffee$/, 
      	loader: 'coffee-loader' 
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['react-hot','babel-loader'],
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      { 
      	test: /\.less$/, 
      	loader: 'style-loader!css-loader!less-loader' 
      }, // use ! to chain loaders
      { 
      	test: /\.scss$/, 
      	loader: 'style-loader!css-loader!scss-loader' 
      }, 
      { 
      	test: /\.css$/, 
      	loader: 'style-loader!css-loader' 
      },
      { 
      	test: /\.(jpe?g|gif|png|svg)$/, 
      	loader: 'url-loader?limit=8192' 
      }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', 'jsx', '.json', '.coffee'],
    moduleDirectories: ['node_modules','src'] 
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
  	//new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  minChunks: Infinity,
    //  filename: 'vendor.js',
    //}),
    //new webpack.DefinePlugin({
    //__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    //__PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    //})
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }
  // watch: true; or type 'webpack --watch' in the terminal
};