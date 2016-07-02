const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
import * as webpack from 'webpack';
import * as extend from 'extend';
import addRequires from './utils/addRequires'

const uglifyDefaults = 
	{ compress:
		{ warnings:false
		, unused:true
		, dead_code:true 
		}
	, output:
		{ comments:true
		}
	};

const extractTextDefaults = {allChunks:true}

export function getPluginsPrep
	( o:WPACK.CONFIG
	, extensions:string[]
	)
	{

		const 
			{ isProd
			, isServer
			, isDev
			, isClient
			, isDevServer
			, doCopyFiles
			, doCompileStyles
			} = o

		const USES_TYPESCRIPT = extensions.indexOf('ts')>=0;

		const copyConfig = doCopyFiles &&
			{ from: o.copyFiles.from
			, to:   o.copyFiles.to
			}; 

		const uglify = extend(true,{},uglifyDefaults,o.uglify);
		const extractText = extend(true,{},extractTextDefaults,o.extractText);

		return (
			{ isProd
			, isDevServer
			, isServer
			, isDev
			, isClient
			, doCompileStyles
			, USES_TYPESCRIPT
			, extractText
			, doCopyFiles
			, copyConfig
			}
		);
	}


export function buildPluginsRaw
	( requires:any
	, o:WPACK.CONFIG
	, extensions:string[]
	):string
	{
		const 
			{ isProd
			, isDevServer
			, isServer
			, isDev
			, isClient
			, doCompileStyles
			, USES_TYPESCRIPT
			, extractText
			, doCopyFiles
			, copyConfig
			} = getPluginsPrep(o,extensions);

		addRequires(requires,'webpack','webpack');

		const str = '[\n'+
			[ `\tnew webpack.DefinePlugin(${JSON.stringify(o.globals,null,'\t\t\t').replace(/\}$/,'\t}')})`
			, isProd && 
				'new webpack.optimize.DedupePlugin()'
			, isProd && 
				'new webpack.optimize.OccurenceOrderPlugin(true)'
			, isDevServer && 
				'new webpack.NoErrorsPlugin()'
			, isDevServer && 
				'new webpack.HotModuleReplacementPlugin()'
			, isServer && isDev && 
				`new webpack.BannerPlugin( 'require("source-map-support").install();', { raw: true, entryOnly: false })`
			, isClient && isProd && 
				`new webpack.optimize.UglifyJsPlugin()`
			, doCompileStyles && addRequires(requires,'extract-text-webpack-plugins','ExtractTextPlugin') &&
				`new ExtractTextPlugin(${JSON.stringify(o.stylesDestination)},${JSON.stringify(extractText,null,'\t\t\t')})`
			, doCopyFiles && addRequires(requires,'copy-webpack-plugin','CopyWebpackPlugin') &&
				`new CopyWebpackPlugin([ JSON.stringify(copyConfig) ])`
			, USES_TYPESCRIPT && addRequires(requires,'awesome-typescript-loader','AwesomeTSLoader') &&
				`new AwesomeTSLoader.ForkCheckerPlugin()`
			].filter(Boolean).join(',\n\t')+'\n]';

		return str;

	}

export default function buildPlugins
	( o:WPACK.CONFIG
	, extensions:string[]
	):WEBPACK.Plugin[]
	{

		const 
			{ isProd
			, isDevServer
			, isServer
			, isDev
			, isClient
			, doCompileStyles
			, USES_TYPESCRIPT
			, extractText
			, doCopyFiles
			, copyConfig
			} = getPluginsPrep(o,extensions);

		return (
			[ new webpack.DefinePlugin(o.globals)
			, isProd && 
				new webpack.optimize.DedupePlugin()
			, isProd && 
				new webpack.optimize.OccurenceOrderPlugin(true)
			, isDevServer && 
				new webpack.NoErrorsPlugin()
			, isDevServer && 
				new webpack.HotModuleReplacementPlugin()

			, isServer && isDev && 
				new webpack.BannerPlugin
					( 'require("source-map-support").install();'
					, { raw: true, entryOnly: false }
					)
			, isClient && isProd && 
				new webpack.optimize.UglifyJsPlugin()
			, doCompileStyles &&
				new ExtractTextPlugin(o.stylesDestination,extractText)
			, doCopyFiles && 
				new CopyWebpackPlugin
					([ copyConfig ])
			, USES_TYPESCRIPT && 
				new ForkCheckerPlugin()
			].filter(Boolean)
		);
		
	}
