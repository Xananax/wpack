import buildModules from './modules';
import buildPlugins,{buildPluginsRaw} from './plugins';
import buildLoaders from './loaders';
import buildEntry from './entry';
import buildOutput from './output';
import buildExternals from './utils/externals';
import buildPostcss,{buildPostcssRaw} from './postcss';
import buildDevServer from './devServer';
import buildNode from './node';
import buildResolve from './resolve';
import stringify from '../utils/stringify';

export function buildConfigPrep( opts:WPACK.CONFIG, raw:boolean, requires?:any):WPACK_INTERNAL.ConfigPrepRaw;
export function buildConfigPrep( opts:WPACK.CONFIG):WPACK_INTERNAL.ConfigPrepNotRaw;
export function buildConfigPrep
	( opts:WPACK.CONFIG
	, raw:boolean=false
	, requires?:any
	):any
	{
		if(raw && !requires){
			throw new Error('you need to provide a `requires` object if you\'re requestion `raw`');
		}
		
		const isProd = !!opts.isProd;
		const isDev = !isProd;
		const isServer = !!opts.isServer;
		const isClient = !isServer;
		const outputContext = opts.outputContext;

		const isDevServer = isDev;

		const loaders = buildLoaders(opts);

		const extensions = loaders.reduce((arr:string[],loader)=>arr.concat(loader.extensions),[])
		const types = loaders.map(loader=>loader.type);

		const modules = buildModules(opts,loaders)
		modules.loaders = modules.loaders.map(
				({test,loader,include,exclude})=>
					({test,loader,include,exclude})
			);
		const entry = buildEntry(opts);
		const output = buildOutput(opts);
		const plugins = raw ? buildPluginsRaw(requires,opts,extensions) : buildPlugins(opts,extensions);
		const resolve = buildResolve(extensions);
		const devServer = isDevServer && buildDevServer(opts.contentBase,opts.hotPort,opts.devServer); 
		const devtool = opts.devtool || 'source-map';
		const postcss = raw ? buildPostcssRaw(requires,types) : buildPostcss(types);
		const debug = opts.debug;
		const externals = buildExternals(`${outputContext}/node_modules`);
		const node = buildNode();
		const target:WEBPACK.Target = isServer ? 'node' : 'web';

		return (
			{ isServer
			, target
			, entry
			, externals
			, output
			, resolve
			, module:modules
			, plugins
			, postcss
			, devServer
			, devtool
			, node
			, debug
			}
		);

	}

export function buildConfigRaw
	( opts:WPACK.CONFIG
	):string
	{
		const requires = {};
		const config = buildConfig(opts,true,requires);
		const requires_str = Object.keys(requires).map(function(moduleName){
			const localName = requires[moduleName];
			return `const ${localName} = require("${moduleName}");`;
		}).join('\n');
		const config_str = 'module.exports = '+stringify(config,1,'\t',function(key,value){
			if(key=='plugins'){return [key,value.replace(/\n/g,'\n\t')];}
			return;
		});
		return (requires_str+'\n\n'+config_str);
	}


export function buildConfig(opts:WPACK.CONFIG,raw:boolean,requires:any):any;
export function buildConfig(opts:WPACK.CONFIG):WEBPACK.CONFIG;
export function buildConfig
	( opts:WPACK.CONFIG
	, raw:boolean=false
	, requires?:any
	):any
	{

		const 
			{ isServer
			, target
			, entry
			, externals
			, output
			, resolve
			, module:modules
			, plugins
			, postcss
			, devServer
			, devtool
			, node
			, debug
			} = buildConfigPrep
				( opts
				, raw
				, requires
				);
		const context = '';
		if(isServer){

			return (
				{ context
				, target
				, entry
				, externals
				, output
				, resolve
				, module:modules
				, plugins
				, postcss
				, devServer
				, devtool
				, node
				, debug
				}
			)
		}

		return (
			{ target
			, entry
			, output
			, resolve
			, module:modules
			, plugins
			, postcss
			, devServer
			, devtool
			, debug
			}
		);
	}

export default function config(opts:WPACK.CONFIG,raw:boolean):string;
export default function config(opts:WPACK.CONFIG):WEBPACK.CONFIG;
export default function config
	( opts:WPACK.CONFIG
	, raw:boolean=false
	)
	{
		return raw ?
			buildConfigRaw(opts) : 
			buildConfig(opts)
		;
	} 