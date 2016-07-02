import defaultsProvider from '../utils/defaultsProvider';
import defaultEnv from './defaultEnv';
import isNull from '../utils/isNull';
import stringToArr from '../utils/stringToArr';
import * as extend from 'extend';
/**
 * 
 * Takes an `Env` object and returns a WPACK.OPTIONS object.
 * No need to pass `process.env`, it is used by default.
 * 
 * @param {WPACK.ENV} [env] an object to overwrite `process.env`
 * @returns {WPACK.OPTIONS}
 */
export default function Env_to_Opts
	( env?:WPACK.ENV
	):WPACK.OPTIONS
	{

		env = extend(true,{},defaultEnv,env,process.env);
		const calling_dir = process.cwd();
		const def = defaultsProvider([env]);

		const
			{ PROD
			, SERVER
			, REACT
			, VENDORS
			, HOTPORT
			, HOSTNAME
			, DIROUT
			, DIRSRC
			, STORAGE
			, DEVTOOL
			, DEBUG
			, LOADERS
			, DESTINATION
			, STYLES
			, BUNDLE
			, SOURCE
			, COPYFROM
			, COPYTO
			, IMAGESOUT
			, IMAGESLIMIT
			, FONTSOUT
			, FONTSLIMIT
			, URLOUT
			, URLLIMIT
			} = env;

		const NODE_ENV = env.NODE_ENV || 'development' 

		return (
			{ isProd:            ( isNull(PROD) ? (NODE_ENV == 'production') : !!PROD )
			, isServer:          ( isNull(SERVER) ? false : !!SERVER )
			, react:             ( isNull(REACT)? true : !!REACT )
			, vendors:           ( isNull(VENDORS)? [] : stringToArr(VENDORS) )
			, hotPort:           ( isNull(HOTPORT)? 8080 : parseInt(`${HOTPORT}`) )
			, hostname:          ( isNull(HOSTNAME)? '0.0.0.0' : `${HOSTNAME}` )
			, outputContext:     ( isNull(DIROUT)? calling_dir : `${DIROUT}` )
			, sources:           ( isNull(DIRSRC)? 'src' : `${DIRSRC}` )
			, storage:           ( isNull(STORAGE)? 'disk' : `${STORAGE}` as WPACK.STORAGE_TYPE )
			, devtool:           ( isNull(DEVTOOL)? 'source-map' : `${DEVTOOL}` as WPACK.DEVTOOL_TYPE )
			, debug:             ( isNull(DEBUG)? false : !!DEBUG )
			, loaders:           ( isNull(LOADERS)? '*' : stringToArr(LOADERS) )
			, outputPath:        ( isNull(DESTINATION)? 'dist' : `${DESTINATION}` )
			, stylesDestination: ( isNull(STYLES)? 'styles' : `${STYLES}` )
			, bundleName:        ( isNull(BUNDLE)? 'bundle' : `${BUNDLE}` )
			, sourceFile:        ( isNull(SOURCE)? 'index.js' : `${SOURCE}` )
			, copyFrom:          ( isNull(COPYFROM)? '' : `${COPYFROM}` )
			, copyTo:            ( isNull(COPYTO)? '' : `${COPYTO}` )
			, imagesOutput:      ( isNull(IMAGESOUT)? '' : `${IMAGESOUT}` )
			, imagesLimit:       ( isNull(IMAGESLIMIT)? 0 : parseInt(`${IMAGESLIMIT}`) )
			, fontsOutput:       ( isNull(FONTSOUT)? '' : `${FONTSOUT}` )
			, fontsLimit:        ( isNull(FONTSLIMIT)? 0 : parseInt(`${FONTSLIMIT}`) )
			, urlOutput:         ( isNull(URLOUT)? '' : `${URLOUT}` )
			, urlLimit:          ( isNull(URLLIMIT)? 0 : parseInt(`${URLLIMIT}`) )
			}
		)

	}

