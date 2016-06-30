const webpack = require("webpack");
const AwesomeTSLoader = require("awesome-typescript-loader");
const AutoPrefixer = require("autoprefixer");NaN



const server = {
	target: 'node',
	entry: {
		'bundle.server': [
			'webpack/hot/poll?1000',
			'index.js'
		],
		vendor: [
			'react',
			'redux',
			'react-redux'
		]
	},
	externals: function externals(context, request, cb) {
        if (node_modules.indexOf(request) !== -1) {
            cb(null, 'commonjs ' + request);
            return;
        }
        cb();
    },
	output: {
		path: '/hawm/wpack',
		filename: 'dist/[name].js',
		publicPath: '/',
		libraryTarget: 'commonjs2',
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
			'.web.tsx',
			'.md',
			'.markdown',
			'.htm',
			'.html',
			'.json',
			'.yaml',
			'.yml'
		],
		modulesDirectories: [
			'node_modules',
			'shared'
		]
	},
	module: {
		noParse: /\.min\.js$/,
		loaders: [
			{
				test: /\.(css)$/i,
				loader: 'ignore-loader',
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
				loader: 'ignore-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|sass)$/i,
				loader: 'ignore-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(styl|stylus)$/i,
				loader: 'ignore-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(ts|tsx|web.ts|web.tsx)$/i,
				loader: 'awesome-typescript-loader?{"library":"es6","doTypeCheck":true,"forkChecker":true,"useBabel":true,"babelOptions":{"presets":["es2015","react","stage-1"],"ignore":["**/node_modules/**"]},"useCache":true}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(md|markdown)$/i,
				loader: 'html-loader!markdown-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(htm|html)$/i,
				loader: 'html-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(json)$/i,
				loader: 'json-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(yaml|yml)$/i,
				loader: 'json-loader!yaml-loader',
				include: 'src',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
				"process.env.NODE_ENV": "\"development\"",
				"__DEBUG__": "true",
				"__HOSTNAME__": "\"0.0.0.0\"",
				"__DEV__": "true",
				"__CLIENT__": "false",
				"__SERVER__": "true",
				"__PROD__": "false",
				"__ENV__": "\"development\"",
				"__bundle__": "\"dist/bundle.server.js\"",
				"__bundle_absolute__": "\"/hawm/wpack/dist/bundle.server.js\"",
				"__vendors__": "\"dist/vendor.js\"",
				"__vendors_absolute__": "\"/hawm/wpack/dist/vendor.js\""
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.BannerPlugin( 'require("source-map-support").install();', { raw: true, entryOnly: false }),
		new AwesomeTSLoader.ForkCheckerPlugin()
	],
	postcss: 'function postCss(){[AutoPrefixer({"browsers":["last 2 versions"]})]}',
	devServer: {
		contentBase: '/',
		port: 8080,
		watchOptions: {
			aggregateTimeout: 200
		},
		stats: {
			context: '/hawm/wpack'
		}
	},
	env: 'development',
	devtool: 'source-map',
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: false,
		__dirname: false,
		setImmediate: true
	},
	debug: false
}

// --- client --------------------------




const client = {
	target: 'web',
	entry: {
		'bundle.client': [
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
		filename: 'dist/public/[name].js',
		publicPath: 'http://0.0.0.0:8080',
		libraryTarget: 'var',
		hotUpdateChunkFilename: 'dist/public/hot/[id].[hash].hot-update.js',
		hotUpdateMainFilename: 'dist/public/hot/[hash].hot-update.json'
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
			'.web.tsx',
			'.md',
			'.markdown',
			'.htm',
			'.html',
			'.json',
			'.yaml',
			'.yml'
		],
		modulesDirectories: [
			'node_modules',
			'shared'
		]
	},
	module: {
		noParse: /\.min\.js$/,
		loaders: [
			{
				test: /\.(css)$/i,
				loader: 'style-loader!css-loader?{"sourceMap":true}!postcss-loader',
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
				loader: 'react-hot!babel?{"presets":["es2015","react","stage-1"],"ignore":["**/node_modules/**"]}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(less)$/i,
				loader: 'style-loader!css-loader?{"sourceMap":true}!postcss-loader!less-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|sass)$/i,
				loader: 'style-loader!css-loader?{"sourceMap":true}!postcss-loader!sass-loader?{"outputStyle":"expanded"}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(styl|stylus)$/i,
				loader: 'style-loader!css-loader?{"sourceMap":true}!postcss-loader!stylus-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(ts|tsx|web.ts|web.tsx)$/i,
				loader: 'react-hot!awesome-typescript-loader?{"library":"es6","doTypeCheck":true,"forkChecker":true,"useBabel":true,"babelOptions":{"presets":["es2015","react","stage-1"],"ignore":["**/node_modules/**"]},"useCache":true}',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(md|markdown)$/i,
				loader: 'html-loader!markdown-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(htm|html)$/i,
				loader: 'html-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(json)$/i,
				loader: 'json-loader',
				include: 'src',
				exclude: /node_modules/
			},
			{
				test: /\.(yaml|yml)$/i,
				loader: 'json-loader!yaml-loader',
				include: 'src',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
				"process.env.NODE_ENV": "\"development\"",
				"__DEBUG__": "true",
				"__HOSTNAME__": "\"0.0.0.0\"",
				"__DEV__": "true",
				"__CLIENT__": "true",
				"__SERVER__": "false",
				"__PROD__": "false",
				"__ENV__": "\"development\"",
				"__bundle__": "\"dist/public/bundle.client.js\"",
				"__bundle_absolute__": "\"/hawm/wpack/dist/public/bundle.client.js\"",
				"__vendors__": "\"dist/public/vendor.js\"",
				"__vendors_absolute__": "\"/hawm/wpack/dist/public/vendor.js\""
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new AwesomeTSLoader.ForkCheckerPlugin()
	],
	postcss: 'function postCss(){[AutoPrefixer({"browsers":["last 2 versions"]})]}',
	devServer: {
		contentBase: '/',
		port: 8080,
		watchOptions: {
			aggregateTimeout: 200
		},
		stats: {
			context: '/hawm/wpack'
		}
	},
	env: 'development',
	devtool: 'source-map',
	debug: false
}

module.exports = [client,server]