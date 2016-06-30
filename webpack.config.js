const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugins");
const AwesomeTSLoader = require("awesome-typescript-loader");
const AutoPrefixer = require("autoprefixer");

module.exports = {
	target: 'web',
	entry: {
		bundle: [
			'webpack-hot-middleware/client?path=http://0.0.0.0:8080/__webpack_hmr',
			'index.js'
		],
		vendor: [
			'react',
			'redux',
			'react-redux'
		]
	},
	output: {
		path: '/hawm/wpack',
		filename: 'dist/[name].js',
		publicPath: 'http://0.0.0.0:8080',
		libraryTarget: 'var',
		hotUpdateChunkFilename: 'dist/hot/[id].[hash].hot-update.js',
		hotUpdateMainFilename: 'dist/hot/[hash].hot-update.json'
	},
	stats: {
		colors: true,
		reasons: false
	},
	resolve: {
		extensions: [
			'.css',
			'.woff',
			'.woff2',
			'.ttf',
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.svg',
			'.js',
			'.jsx',
			'.web.js',
			'.web.jsx',
			'.less',
			'.scss',
			'.sass',
			'.styl',
			'.stylus',
			'.ts',
			'.tsx',
			'.web.ts',
			'.web.tsx'
		],
		modulesDirectories: [
			'node_modules',
			'shared'
		]
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		],
		loaders: [
			{
				test: /\.(css)$/i,
				loader: '/hawm/wpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader?{"sourceMap":true}!postcss-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(woff|woff2|ttf)$/i,
				loader: 'url-loader?{"limit":8192,"name":"/[name].[ext]?[hash]"}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				loader: 'url-loader?{"limit":8192,"name":"/[name].[ext]?[hash]"}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx|web.js|web.jsx)$/i,
				loader: 'babel?{"presets":["es2015","react","stage-1"],"ignore":["**/node_modules/**"]}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(less)$/i,
				loader: '/hawm/wpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader?{"sourceMap":true}!postcss-loader!less-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|sass)$/i,
				loader: '/hawm/wpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader?{"sourceMap":true}!postcss-loader!sass-loader?{"outputStyle":"compressed"}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(styl|stylus)$/i,
				loader: '/hawm/wpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader?{"sourceMap":true}!postcss-loader!stylus-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(ts|tsx|web.ts|web.tsx)$/i,
				loader: 'awesome-typescript-loader?{"library":"es6","doTypeCheck":true,"forkChecker":true,"useBabel":true,"babelOptions":{"presets":["es2015","react","stage-1"],"ignore":["**/node_modules/**"]},"useCache":true}',
				include: 'src',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
	new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\"",
			"__DEBUG__": "false",
			"__HOSTNAME__": "\"0.0.0.0\"",
			"__DEV__": "false",
			"__CLIENT__": "true",
			"__SERVER__": "false",
			"__PROD__": "true",
			"__ENV__": "\"production\""
}),
	 new webpack.optimize.DedupePlugin(),
	 new webpack.optimize.OccurenceOrderPlugin(true),
	 new webpack.optimize.UglifyJsPlugin(),
	 new ExtractTextPlugin("styles",{
			"allChunks": true
}),
	 new AwesomeTSLoader.ForkCheckerPlugin()
	]},
	postcss: 'function postCss(){[AutoPrefixer({"browsers":["last 2 versions"]})]}',
	devServer: false,
	env: 'production',
	devtool: 'source-map',
	debug: false
}