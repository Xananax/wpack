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

declare namespace WEBPACK{

	type Target = 'web'|'webworker'|'node'|'async-node'|'node-webkit'|'electron';

	type DevTool = 'eval'|'source-map'|'hidden-source-map'|'inline-source-map'|'eval-source-map'|'cheap-source-map'|'cheap-module-source-map';

	interface EntryObject{
		[name:string]:string|string[]|EntryObject;
	}

	interface devtoolModuleFilenameTemplateArg{
		identifier:string;
		shortIdentifier:string;
		resouce:string;
		resourcePath:string;
		absoluteResourcePath:string;
		allLoaders:string[];
		query:string;
		moduleId:string;
		hash:string;
	}

	interface devtoolModuleFilenameTemplateFn{
		(info:devtoolModuleFilenameTemplateArg):string;
	}
	
	interface TestFn{
		(absPath:string):boolean;	
	}

	type Test = RegExp|string|TestFn;

	interface LoaderTest{
		test:Test|Test[];
		include?:RegExp|string|Array<RegExp|string>;
		exclude?:RegExp|string|Array<RegExp|string>;
	}

	interface Output{
		//Specifies the name of each output file on disk. You must not specify an absolute path here! The output.path option determines the location on disk the files are written to, filename is used solely for naming the individual files.
		filename:string;
		//The output directory as absolute path (required).
		path:string;
		// The publicPath specifies the public URL address of the output files when referenced in a browser. For loaders that embed <script> or <link> tags or reference assets like images, publicPath is used as the href or url() to the file when it’s different then their location on disk (as specified by path). This can be helpful when you want to host some or all output files on a different domain or on a CDN. The Webpack Dev Server also takes a hint from publicPath using it to determine where to serve the output files from. As with path you can use the [hash] substitution for a better caching profile.
		publicPath:string;
		// The filename of non-entry chunks as relative path inside the output.path directory.
		// [id] is replaced by the id of the chunk.
		// 
		// [name] is replaced by the name of the chunk (or with the id when the chunk has no name).
		// 
		// [hash] is replaced by the hash of the compilation.
		// 
		// [chunkhash] is replaced by the hash of the chunk.
		chunkFilename?:string;
		//The filename of the SourceMaps for the JavaScript files. They are inside the output.path directory.
		// [file] is replaced by the filename of the JavaScript file.
		// 
		// [id] is replaced by the id of the chunk.
		// 
		// [hash] is replaced by the hash of the compilation.
		sourceMapFilename?:string;
		// Filename template string of function for the sources array in a generated SourceMap.
		// [resource] is replaced by the path used by Webpack to resolve the file, including the query params to the rightmost loader (if any).
		// 
		// [resource-path] is the same as [resource] but without the loader query params.
		// 
		// [loaders] is the list of loaders and params up to the name of the rightmost loader (only explict loaders).
		// 
		// [all-loaders] is the list of loaders and params up to the name of the rightmost loader (including automatic loaders).
		// 
		// [id] is replaced by the id of the module.
		// 
		// [hash] is replaced by the hash of the module identifier.
		// 
		// [absolute-resource-path] is replaced with the absolute filename.
		// Can also be defined as a function instead of a string template. The function will accept an info object parameter which exposes the following properties:
		// 
		//  - identifier
		//  - shortIdentifier
		//  - resource
		//  - resourcePath
		//  - absoluteResourcePath
		//  - allLoaders
		//  - query
		//  - moduleId
		//  - hash
		devtoolModuleFilenameTemplate?:string|devtoolModuleFilenameTemplateFn;
		// Similar to output.devtoolModuleFilenameTemplate, but used in the case of duplicate module identifiers.
		devtoolFallbackModuleFilenameTemplate?:string|devtoolModuleFilenameTemplateFn;
		// Enable line to line mapped mode for all/specified modules. Line to line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It’s a performance optimization. Only use it if your performance need to be better and you are sure that input lines match which generated lines.
		// true enables it for all modules (not recommended)
		devtoolLineToLine?:boolean|LoaderTest
		//The filename of the Hot Update Chunks. They are inside the output.path directory.
		//
		// [id] is replaced by the id of the chunk.
		// 
		// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
		hotUpdateChunkFilename?:string;
		// The filename of the Hot Update Main File. It is inside the output.path directory.
		// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
		hotUpdateMainFilename?:string;
		// The JSONP function used by webpack for asnyc loading of chunks.
		//
		// A shorter function may reduce the filesize a bit. Use different identifier, when having multiple webpack instances on a single page.
		jsonpFunction?:string;
		// The JSONP function used by webpack for async loading of hot update chunks.
		hotUpdateFunction?:string;
		// Include comments with information about the modules.
		pathinfo?:boolean;
		// If set, export the bundle as library. output.library is the name.
		// Use this, if you are writing a library and want to publish it as single file.
		library?:string;
		// Which format to export the library:
		//
		//  - "var" - Export by setting a variable: var Library = xxx (default)
		//  - "this" - Export by setting a property of this: this["Library"] = xxx
		//  - "commonjs" - Export by setting a property of exports: exports["Library"] = xxx
		//  - "commonjs2" - Export by setting module.exports: module.exports = xxx
		//  - "amd" - Export to AMD (optionally named - set the name via the library option) 
		//  - "umd" - Export to AMD, CommonJS2 or as property in root
		// If output.library is not set, but output.libraryTarget is set to a value other than var, every property of the exported object is copied (Except amd, commonjs2 and umd).
		libraryTarget:"var"|"this"|"commonjs"|"commonjs2"|"amd"|"umd";
		// If output.libraryTarget is set to umd and output.library is set, setting this to true will name the AMD module.
		umdNamedDefine?:string;
		// Prefixes every line of the source in the bundle with this string.
		sourcePrefix?:string;
		// This option enables cross-origin loading of chunks.
		// Possible values are:
		// 
		//  - false - Disable cross-origin loading.
		//  - "anonymous" - Cross-origin loading is enabled. When using anonymous no credentials will be send with the request.
		//  - "use-credentials" - Cross-origin loading is enabled and credentials will be send with the request.
		crossOriginLoading?:boolean|"anonymous"|"use-credentials";
	}

	interface Loader extends LoaderTest{
		loader?:string;
		loaders?:string[];
		query?:any;
	}

	interface Module{
		// An array of automatically applied loaders.
		loaders:Loader[];
		// An array of applied pre loaders
		preLoaders?:Loader[];
		// An array of applied post loaders
		postLoaders?:Loader[];
		// A RegExp or an array of RegExps. Don’t parse files matching.
		// It’s matched against the full resolved request.
		// 
		// This can boost the performance when ignoring big libraries.
		// 
		// The files are expected to have no call to require, define or similar. They are allowed to use exports and module.exports.
		noParse?:RegExp|RegExp[];
	}

	interface Resolve{
		// Replace modules by other modules or paths.
		// 
		// Expected is a object with keys being module names. The value is the new path. It’s similar to a replace but a bit more clever. If the the key ends with $ only the exact match (without the $) will be replaced.
		// 
		// If the value is a relative path it will be relative to the file containing the require.
		alias?:{
			[moduleName:string]:string;
		}
		// The directory (absolute path) that contains your modules. May also be an array of directories. This setting should be used to add individual directories to the search path.
		// It must be an absolute path! Don’t pass something like ./app/modules.
		root?:string|string[];
		// An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules. This functions similarly to how node finds “node_modules” directories. For example, if the value is ["mydir"], webpack will look in “./mydir”, “../mydir”, “../../mydir”, etc.
		modulesDirectories?:string[];
		// A directory (or array of directories absolute paths), in which webpack should look for modules that weren’t found in resolve.root or resolve.modulesDirectories.
		fallback?:string|string[];
		// An array of extensions that should be used to resolve modules. For example, in order to discover CoffeeScript files, your array should contain the string ".coffee".
		// **IMPORTANT**: Setting this option will override the default, meaning that webpack will no longer try to resolve modules using the default extensions. If you want modules that were required with their extension (e.g. require('./somefile.ext')) to be properly resolved, you must include an empty string in your array. Similarly, if you want modules that were required without extensions (e.g. require('underscore')) to be resolved to files with “.js” extensions, you must include ".js" in your array.
		extensions:string[];
		// Check these fields in the package.json for suitable files.
		// Default: `["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]`
		packageMains?:Array<string|string[]>;
		// Check this field in the package.json for an object. Key-value-pairs are threaded as aliasing according to [this spec](https://gist.github.com/defunctzombie/4339901)
		packageAlias?:any;
		// Enable aggressive but unsafe caching for the resolving of a part of your files. Changes to cached paths may cause failure (in rare cases). An array of RegExps, only a RegExp or true (all files) is expected. If the resolved path matches, it’ll be cached.
		unsafeCache?:boolean|RegExp|RegExp[];
	}

	interface ResolveLoader extends Resolve{
		// That’s a resolveLoader only property.
		// 
		// It describes alternatives for the module name that are tried.
		// Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
		moduleTemplates?:string[];
	}

	interface ExternalFn{
		(context:string,request:string,callback:(err, result)=>void):void;
	}

	type External = ExternalFn | {[name:string]:boolean|string} | RegExp;

	interface WatchOptions{
		// (only used when using CLI or simple node.js API)
		// Delay the rebuilt after the first change. Value is a time in ms.
		aggregateTimeout?:number;
		// (only used when using CLI or simple node.js API)
		// 
		// - true: use polling
		// - number: use polling with specified interval
		poll?:boolean|number;
	}

	interface DevServer{
		// path/to/directories
		// or: contentBase: "http://localhost/",
		contentBase:string;
		// Enable special support for Hot Module Replacement
		// Page is no longer updated, but a "webpackHotUpdate" message is send to the content
		// Use "webpack/hot/dev-server" as additional module in your entry point
		// Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 
		hot?:boolean;
		// Set this as true if you want to access dev server from arbitrary url.
		// This is handy if you are using a html5 router.
		historyApiFallback?:boolean;
		// Set this if you want to enable gzip compression for assets
		compress?:boolean;
		// Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
		// Use "*" to proxy all paths to the specified server.
		// This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
		// and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
		proxy?:{
			[address:string]:string
		}
		// pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
		staticOptions:any;

		// webpack-dev-middleware options
		quiet?:boolean;
		noInfo?:boolean;
		lazy?:boolean;
		filename?:string;
		watchOptions?:WatchOptions
		publicPath:string;
		headers?:{[name:string]:string}
		stats?:{ 
			colors:boolean;
			reasons:boolean;
		}
	}

	interface Node{
		console:boolean;
		global:boolean;
		process:boolean|'mock';
		Buffer:boolean;
		__filename:boolean|'mock';
		__dirname:boolean|'mock';
		setImmediate:boolean;
	}

	interface Plugin{
		(...args:any[]):any;
	}

	interface PostCSS{
		():Function[];
	}

	interface CONFIG{
		//The base directory (absolute path!) for resolving the entry option. If output.pathinfo is set, the included pathinfo is shortened to this directory.
		context:string;
		// The entry point for the bundle.
		// If you pass a string: The string is resolved to a module which is loaded upon startup.
		//If you pass an array: All modules are loaded upon startup. The last one is exported.
		//If you pass an object: Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.
		entry:string|string[]|EntryObject;
		//Options affecting the output of the compilation. output options tell Webpack how to write the compiled files to disk. Note, that while there can be multiple entry points, only one output configuration is specified.
		// If you use any hashing ([hash] or [chunkhash]) make sure to have a consistent ordering of modules. Use the OccurenceOrderPlugin or recordsPath.
		output:Output
		// Options affecting the normal modules (NormalModuleFactory)
		module:Module;
		// Options affecting the resolving of modules.
		resolve:Resolve;
		// Like resolve but for loaders.
		// Note that you can use alias here and other features familiar from resolve. For example { txt: 'raw-loader' } would shim txt!templates/demo.txt to use raw-loader.
		resolveLoader?:ResolveLoader;
		// Specify dependencies that shouldn’t be resolved by webpack, but should become dependencies of the resulting bundle. The kind of the dependency depends on output.libraryTarget.
		// 
		// As value an object, a string, a function, a RegExp and an array is accepted.
		// 
		// - string: An exact matched dependency becomes external. The same string is used as external dependency.
		// - object: If an dependency matches exactly a property of the object, the property value is used as dependency. The property value may contain a dependency type prefixed and separated with a space. If the property value is true the property name is used instead. If the property value is false the externals test is aborted and the dependency is not external. See example below.
		// - function: function(context, request, callback(err, result)) The function is called on each dependency. If a result is passed to the callback function this value is handled like a property value of an object (above bullet point).
		// - RegExp: Every matched dependency becomes external. The matched text is used as the request for the external dependency. Because the request is the exact code used to generate the external code hook, if you are matching a commonjs package (e.g. ‘../some/package.js’), instead use the function external strategy. You can import the package via callback(null, "require('" + request + "')", which generates a module.exports = require('../some/package.js');, using require outside of webpack context.
		// - array: Multiple values of the scheme (recursive).
		externals?:External[]|External;
		// target
		//  - "web" Compile for usage in a browser-like environment (default)
		//  - "webworker" Compile as WebWorker
		//  - "node" Compile for usage in a node.js-like environment (use require to load chunks)
		//  - "async-node" Compile for usage in a node.js-like environment (use fs and vm to load chunks async)
		//  - "node-webkit" Compile for usage in webkit, uses jsonp chunk loading but also supports builtin node.js modules plus require(“nw.gui”) (experimental)
		//  - "electron" Compile for usage in Electron – supports require-ing Electron-specific modules.
		target?:Target;
		// Report the first error as a hard error instead of tolerating it.
		bail?:boolean;
		// Capture timing information for each module.
		profile?:boolean;
		// Cache generated modules and chunks to improve performance for multiple incremental builds.
		// This is enabled by default in watch mode.
		// 
		// You can pass false to disable it.
		// 
		// You can pass an object to enable it and let webpack use the passed object as cache. This way you can share the cache object between multiple compiler calls. Note: Don’t share the cache between calls with different options.
		cache?:boolean|Object;
		// Enter watch mode, which rebuilds on file change.
		watch?:boolean;
		watchOptions?:WatchOptions;
		// Switch loaders to debug mode.
		debug?:boolean;
		// Choose a developer tool to enhance debugging.
		// 
		//  - eval - Each module is executed with eval and //@ sourceURL.
		//  - source-map - A SourceMap is emitted. See also output.sourceMapFilename.
		//  - hidden-source-map - Same as source-map, but doesn’t add a reference comment to the bundle.
		//  - inline-source-map - A SourceMap is added as DataUrl to the JavaScript file.
		//  - eval-source-map - Each module is executed with eval and a SourceMap is added as DataUrl to the eval.
		//  - cheap-source-map - A SourceMap without column-mappings. SourceMaps from loaders are not used.
		//  - cheap-module-source-map - A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line.
		// 
		// Prefixing @, # or #@ will enforce a pragma style. (Defaults to #, recommended)
		// 
		// Combinations are possible. hidden, inline, eval and pragma style are exclusive.
		// i. e. cheap-module-inline-source-map, cheap-eval-source-map, #@source-map 
		// Hint: If your modules already contain SourceMaps you’ll need to use the source-map-loader to merge it with the emitted SourceMap.
		devtool:DevTool;
		devServer?:DevServer;
		node?:Node;
		//Set the value of require.amd and define.amd.
		// Example: amd: { jQuery: true } (for old 1.x AMD versions of jquery)
		amd?:{[name:string]:boolean}
		loader?:any;
		plugins?:Plugin[];
		// Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.
		// An absolute path is expected. recordsPath is used for recordsInputPath and recordsOutputPath if they left undefined.
		// This is required, when using Hot Code Replacement between multiple calls to the compiler.
		recordsPath?:string;
		recordsInputPath?:string;
		recordsOutputPath?:string;
		postcss?:PostCSS;
	}

}


declare namespace WPACK{

	interface OPTIONS{
		hostname:string;
		hotPort:number;
		isProd:boolean;
		isServer:boolean;
		outputContext:string;
		sources:string;
		storage:STORAGE_TYPE;
		devtool:DEVTOOL_TYPE;
		debug:boolean;
		react:boolean;
		loaders:string|string[];
		outputPath:string;
		stylesDestination:string;
		bundleName:string;
		sourceFile:string;
		copyFrom?:string;
		copyTo?:string;
		imagesOutput?:string;
		imagesLimit?:number;
		fontsOutput?:string;
		fontsLimit?:number;
		urlOutput?:string;
		urlLimit?:number;
		vendors?:string|string[];
		globals?:any;
	}

	interface ENV{
		PROD:boolean;
		HOTPORT:number;
		NODE_ENV:string;
		HOSTNAME:string;
		SERVER:boolean;
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
		IMAGESLIMIT:number;
		FONTSOUT:string;
		FONTSLIMIT:number;
		URLOUT:string;
		URLLIMIT:number;
	}

	type DEVTOOL_TYPE =  WEBPACK.DevTool;
	type STORAGE_TYPE = 'disk'|'memory'

	interface CONFIG{
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

	interface RequestHandler{
		(req:any,res:any,next?:(error?:Error)=>void):void
	}	

	interface SwappableHandler extends RequestHandler{
		swap(handler:RequestHandler):this;
	}

	interface URLLoaderGenerator extends LoaderGenerator<'url',WPACK.URLLoader>{}

	interface StyleLoaderGenerator extends LoaderGenerator<'style',void>{}

	interface CodeLoaderGenerator extends LoaderGenerator<'code',WPACK.CodeLoader>{}

	interface MarkupLoaderGenerator extends LoaderGenerator<'markup',WPACK.Loader>{}

	interface DataLoaderGenerator extends LoaderGenerator<'data',WPACK.Loader>{}


	interface Loader extends WEBPACK.Loader{
		name:string;
		type:WPACK.LOADER_TYPE;
		extensions:string[]
	}

	interface Watcher{ 
		watch(callback:(...args)=>any):void;
		waitUntilValid(callback:(...args)=>any):void;
		invalidate(callback:(...args)=>any):void;
		close(callback:(...args)=>any):void;
		ready(callback:(...args)=>any,req:string):void;
		rebuild():void;
	}

	interface WebpackDevMiddleWare extends WPACK_INTERNAL.Watcher{
		(req, res, next:(error?:Error)=>void):void;
		getFilenameFromUrl(url:string):string;
		fileSystem:any;
	}

	interface CompilerConfig<C,W>{
		config:WEBPACK.CONFIG
		config_raw:string
		bundle_path:string
		compiler:C;
		watcher:W;
	}

	interface DevServerMembers<C,W>{
		server:CompilerConfig<C,W>;
		client:CompilerConfig<C,W>;
	}

	interface ConfigPrep{
		isServer:boolean;
		target:string;
		entry:WEBPACK.EntryObject;
		externals:WEBPACK.External
		output:WEBPACK.Output;
		resolve:WEBPACK.Resolve;
		module:WEBPACK.Module;
		devServer:WEBPACK.DevServer;
		devtool:WEBPACK.DevTool
		node:WEBPACK.Node;
		debug:boolean;
	}

	interface ConfigPrepRaw extends ConfigPrep{ 
		plugins:string;
		postcss:string;
	}

	interface ConfigPrepNotRaw extends ConfigPrep{ 
		plugins:WEBPACK.Plugin[];
		postcss:WEBPACK.PostCSS;
	}

	interface PresetForType{
		(env:WPACK.ENV, optionsFilename:string, isProd:boolean, returnWebpackConfig:boolean):WEBPACK.CONFIG;
		(env:WPACK.ENV, optionsFilename:string, isProd:boolean):WPACK.CONFIG;
		dev:PresetForEnv;
		prod:PresetForEnv;
	}

	interface PresetForEnv{
		(env:WPACK.ENV, optionsFilename:string, returnWebpackConfig:boolean):WEBPACK.CONFIG;
		(env:WPACK.ENV, optionsFilename:string):WPACK.CONFIG;
	}

	interface Preset{
		( env:WPACK.ENV, optionsFilename:string, type:"server"|"client", isProd:boolean, returnWebpackConfig:boolean):WEBPACK.CONFIG
		( env:WPACK.ENV, optionsFilename:string, type:"server"|"client", isProd:boolean):WPACK.CONFIG;
		client:PresetForType;
		server:PresetForType;
	}

	interface Task{
		(env:WPACK.ENV,optionsFileName:string,taskFlags:any,callback:(err?:Error)=>void)
		help:string;
		alias:string;
		flags:[string,[string,any]]
	}

}

interface NodeModule{
	hot:{
		accept(modules:string|string[],callback:()=>any):void
	}
}