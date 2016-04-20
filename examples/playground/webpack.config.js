/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
const webpack = require('webpack');
// path module used to resolve absolute paths
const path = require('path');
// cleans the bundled directory between build
const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');

const PATHS = {
	app   : path.join(__dirname, '/src'),
	main  : path.join(__dirname, '/src/main.js'),
	output: path.join(__dirname, '/build')
};

console.error('DIRECTORY:', __dirname);

module.exports = {
	context: PATHS.app,
	entry  : PATHS.main,
	output : {
		path    : PATHS.output,
		filename: 'main.js'
	},

	cache:   true,
	stats: {
		colors :  true,
		reasons: true
	},

	resolve: {
		extensions: ['', '.js'],
		alias     :      {
			'styles'    : __dirname + '/src/styles',
			'mixins'    : __dirname + '/src/mixins',
			'components': __dirname + '/src/components/'
		}
	},

	resolveLoader: {
		fallback: path.join(__dirname, "node_modules")
	},

	module:  {
		loaders:    [
			// compile all javascript files using the babel-loader module
			{
				test   :    /\.js$/,
				exclude: /node_modules/,
				loader :  'babel',
				query  : {
					presets       : ['es2015', 'react'],
					cacheDirectory: true
				}
			},
			{
				test  : /\.html$/,
				loader: 'file',
				query : {
					name: '[name].[ext]'
				}
			},
			// compile sass files using the sass-loader module
			// stored in the compiled javascript file
			{
				test   : /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			// compile css files using the css-loader module
			// stored in the compiled javascript file
			{
				test   : /\.css$/,
				loaders: ['style', 'css', 'postcss'],
			},
			// compile local images
			// hash file names to prevent cacheing
			// copy into 'assets/img' sub-directory
			{
				test   : /\.(png|jpg|gif|svg)$/,
				exclude: /node_modules/,
				loader : 'file',
				query  : {
					name: 'assets/img/img-[hash:6].[ext]'
				}
			},
			{
				test   : /\.ico$/,
				exclude: /node_modules/,
				loader : 'file',
				query  : {
					name: '[name].[ext]'
				}
			},
			{
				test  : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url',
				query : {
					limit   : 10000,
					minetype: 'application/font-woff',
					name    : 'assets/fonts/[name].[ext]'
				}
			},
			{
				test  : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url',
				query : {
					limit: 8192,
					name : 'assets/fonts/[name].[ext]'
				}
			}
		]
	},
	postcss: [ autoprefixer({ browsers: ['last 2 versions']  })  ],
	plugins: [
		new CleanWebpackPlugin(['build'], {
			root   : __dirname + '/',
			verbose: true
		})
	]

};
