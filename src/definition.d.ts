declare var __BUNDLE__:string;
declare var __BUNDLE_ABSOLUTE__:string;
declare var __VENDORS__:string;
declare var __VENDORS_ABSOLUTE__:string;
declare var __STYLES__:string;
declare var __STYLES_ABSOLUTE__:string;
declare var __ASSETS__:string;
declare var __ASSETS_ABSOLUTE__:string;
declare var __DEV__:boolean;
declare var __PROD__:boolean;
declare var __SERVER__:boolean;
declare var __DEV_SERVER__:boolean;
declare var __CLIENT__:boolean;
declare var __ENV__:string;

declare namespace WPACK{

	interface ENV_OPTIONS{
		hostname:string;
		hotPort:number;
		isProd:boolean;
		isServer:boolean;
		outputContext:string;
		sources:string;
		storage:'disk'|'memory';
		devtool:'source-map'|'eval';
		debug:boolean;
		react:boolean;
		loaders:string|string[];
		outputPath:string;
		stylesDestination:string;
		bundleName:string;
		sourceFile:string;
		copyFrom:string;
		copyTo:string;
		imagesOutput?:string;
		imagesLimit?:number;
		fontsOutput?:string;
		fontsLimit?:number;
		urlOutput?:string;
		urlLimit?:number;
		vendors:string|string[];
		globals?:any;
	}

	interface ENV{
		HOTPORT:number;
		HOSTNAME:string;
		SERVER:string;
		DIROUT:string;
		DIRSRC:string;
		STORAGE:string;
		DEVTOOL:string;
		DEBUG:boolean;
		REACT:boolean;
		LOADERS:string|string[];
		DESTINATION:string;
		STYLES:string;
		BUNDLE:string;
		SOURCE:string;
		COPYFROM:string;
		COPYTO:string;
		VENDORS:string|string[];
		IMAGESOUT:string;
		IMAGESLIMIT:string;
		FONTSOUT:string;
		FONTSLIMIT:string;
		URLOUT:string;
		URLLIMIT:string;
	}

	type DEVTOOL_TYPE =  'source-map'|'eval'
	type STORAGE_TYPE = 'disk'|'memory'

	interface OPTS{
		isProd:boolean;
		isServer:boolean;
		outputContext:string; //full path to root context; usually __dirname
		contentBase:string//passed to devServer
		hotPort:number; //
		devServer?:any; // additional options to pass to the dev server
		devtool:DEVTOOL_TYPE
		debug:boolean; //switches loaders to debug mode
		files:{[name:string]:string}
		react:boolean; // true if using react
		sources:string|string[]; // directory for all the sources
		loaders:string[]; //array of loaders that are wanted, e.g. ['js','css']
		code?:CodeLoader; //
		url?:URLLoader; //
		//js?:CodeLoader; //
		//ts?:CodeLoader; //
		images?:URLLoader; //
		fonts?:URLLoader; // 
		storage:STORAGE_TYPE //memory doesn't work yet
		outputPath:string; //the sub-directory where files are output, e.g, 'js/'
		bundleName:string //name of the bundle
		hot_url:string; // localhost:8080
		isDev:boolean;
		isClient:boolean;
		hasVendors:boolean;
		sourceFile	:string; //name of the entry file, relative to `sources`
		vendor:string[]; // an optional array of files to add to the `vendor` bundle 
		globals:any;
		copyFiles?:{
			from:string;
			to:string;
		}
		stylesDestination:string; // name of the css bundle, relative to the outputContext
		uglify:Uglify
		extractText?:{
			allChunks?:boolean;
		}
		isDevServer:boolean;
		doCopyFiles:boolean;
		doCompileStyles:boolean;
	}

	interface Loader{
		isProd:boolean; //true if the bundle is a production bundle
		isServer:boolean; //true if the bundle is intended for server usage
		react:boolean; // true if using react
		sources:string|string[]; // directory for all the sources
		isExternal?:boolean; //if true, the loader will *not* ignore node_modules
	}

	interface CodeLoader{
		babel:any; // optional babel configuration
	}

	interface URLLoader{
		outputContext?:string; // path for exported assets
		limit?:number //maximal number of bytes
	}

	interface Uglify{
		compress?:{ 
			warnings?:boolean;
			unused?:boolean;
			dead_code?:boolean 
		};
		output?:{ 
			comments?: boolean;
			code?:string;
			map?:string;
		};
	}

	type LOADER_TYPE = 'code'|'style'|'url'|'markup'|'raw'|'data'
}

declare namespace WPACK_INTERNAL{

	interface LoaderGenerator<T,O>{
		(options:WPACK.Loader,additionalOptions?:O):Loader
		type:WPACK.LOADER_TYPE;
	}
	
	interface URLLoaderGenerator extends LoaderGenerator<'url',WPACK.URLLoader>{}

	interface StyleLoaderGenerator extends LoaderGenerator<'style',void>{}

	interface CodeLoaderGenerator extends LoaderGenerator<'code',WPACK.CodeLoader>{}

	interface MarkupLoaderGenerator extends LoaderGenerator<'markup',WPACK.Loader>{}

	interface DataLoaderGenerator extends LoaderGenerator<'data',WPACK.Loader>{}


	interface Loader{
		name:string;
		test:RegExp;
		type:WPACK.LOADER_TYPE;
		extensions:string[]
		loader:string;
		include:RegExp|string|Array<RegExp|String>;
		exclude:RegExp|string|Array<RegExp|String>;
	}

	interface Watcher{ 
		watch(callback:(...args)=>any):void;
		waitUntilValid(callback:(...args)=>any):void;
		invalidate(callback:(...args)=>any):void;
		close(callback:(...args)=>any):void;
		ready(callback:(...args)=>any,req:string):void;
	}
	interface CompilerConfig{
	name:string;
	flags:WPACK.OPTS
	config:any
	config_raw:string
	bundle_path:string
	compiler:any;
	watcher:WPACK_INTERNAL.Watcher
	}

	interface DevServerMembers{
		server:CompilerConfig;
		client:CompilerConfig;
	}
}

interface NodeModule{
	hot:{
		accept(modules:string|string[],callback:()=>any):void
	}
}