var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'./src/scripts/main.ts',
			'./src/styles.scss'
		]
	},
	output: {
		path: './docs/',
		filename: '[name].bundle.js'
	},
	externals: {},
	devtool: 'source-map',
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("styles.css"),
		new CopyWebpackPlugin([{ from: 'src/index.html' }], { copyUnmodified: true })
	],
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
		]
	}
}