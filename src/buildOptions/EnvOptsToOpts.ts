import path from 'path';
import * as extend from 'extend';
import stringToArr from '../utils/stringToArr';
import defaultOptions from './defaultOptions';
import fromFile from './fromFile';
import buildGlobs from './buildGlobs';

export function makeFilePaths(outputContext:string,outputPath:string){
	return function filesPaths(name:string,bundleName:string){
		const localPath = [outputPath,bundleName].join('/'); 
		const absolutePath = [outputContext,localPath].join('/');
		return (
			[ 
				[ name
				, localPath
				]
			, 	[ `${name}_absolute`
				, absolutePath
				]
			]
		)
	}
}

export function readLoaders
	( opts:WPACK.ENV_OPTIONS
	)
	{
		const loaders = opts.loaders;
		return stringToArr(loaders);
	}

export function readVendors
	( opts:WPACK.ENV_OPTIONS
	)
	{
		const vendors = opts.vendors
		return stringToArr(vendors);
	}

export function readCopyFiles
	( opts:WPACK.ENV_OPTIONS
	)
	{
		const {copyFrom,copyTo} = opts;
		if(!copyFrom || !copyTo){return;}
		return (
			{ from:copyFrom
			, to:copyTo
			}
		);
	}

export function readURLLoader
	( name:string
	, opts:WPACK.ENV_OPTIONS
	):any
	{
		if(!opts){return;}
		const limit = opts[`${name}_limit`];
		const outputContext = opts[`${name}_output`];
		if(!limit && !outputContext){return;}
		console.log(limit,outputContext,'hey')
		if(limit && outputContext){
			return {limit,outputContext};
		}
		if(limit){
			return {limit};
		}
		return {outputContext}
	}

export default function EnvOptsToOpts
	( opts?:WPACK.ENV_OPTIONS
	, optionsFile?:string
	):WPACK.OPTS
	{

		opts = extend(true,{},defaultOptions,fromFile(optionsFile),opts);

		const 
			{ hostname
			, hotPort
			, isProd
			, isServer
			, outputContext
			, sources
			, storage
			, devtool
			, debug
			, react
			, outputPath
			, stylesDestination
			, bundleName
			, sourceFile
			, copyFrom
			, copyTo
			} = opts;

		const isDev = !isProd;
		const loaders = readLoaders(opts);
		const vendor = readVendors(opts);
		const copyFiles = readCopyFiles(opts);
		const hot_url = `http://${hostname}${hotPort==80?'':':'+hotPort}`;
		const isClient = !isServer;
		const hasVendors = !!(vendor.length || react);
		const doCompileStyles = !!(isServer && isProd && stylesDestination);
		const doCopyFiles = !!(isClient && isProd && ( copyFiles && copyFiles.from && copyFiles.to ));
		const isDevServer = isDev;

		const filePaths = makeFilePaths(outputContext,outputPath);

		const files = 
			[ filePaths('bundle',`${bundleName}.js`)
			, hasVendors && filePaths('vendors','vendor.js')
			, doCompileStyles && filePaths('styles',`${stylesDestination}.css`) 
			, doCopyFiles && filePaths('assets',copyFiles.to)
			].filter(Boolean).reduce(function(prev:string[][],curr:string[][]){
				return prev.concat(curr)
			},[]);

		const globals = buildGlobs
			( isProd
			, isServer
			, files
			, extend
				( true
				, { debug:isDev , hostname }
				, opts.globals
				)
			)
			;
		
		const _files:{[name:string]:string} = {};
		
		files.forEach(function([name,localPath]){
			_files[name] = localPath;
		})

		return ( 
			{ isProd
			, isClient
			, isDev
			, hasVendors
			, isDevServer
			, doCompileStyles
			, doCopyFiles
			, isServer
			, outputContext
			, contentBase:'/'
			, hotPort
			, devServer:{}
			, devtool
			, debug
			, loaders
			, react
			, sources
			, storage
			, outputPath
			, hot_url
			, bundleName:bundleName.replace(/\.js$/,'')
			, sourceFile
			, vendor
			, globals
			, copyFiles
			, stylesDestination
			, uglify:{}
			, extractText:{}
			, images:readURLLoader('images',opts)
			, fonts:readURLLoader('fonts',opts)
			, url:readURLLoader('url',opts)
			, files:_files
			}
		);

	}