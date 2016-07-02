import * as extend from 'extend';
import Env_to_Opts from '../buildOptions/Env_to_Opts';
import Opts_to_WpackConf from '../buildOptions/Opts_to_WpackConf';
import buildConfig from '../buildConfig';

/**
 * 
 * Shortcut function to create configurations
 * The exported configuration is *not* a webpack suitable config;
 * It still must be fed to `buildConfig` before being usable.
 * 
 * @param {WPACK.ENV} env an environment object. No need to pass process.env, it is automatically used
 * @param {string} optionsFilename a supplementary options file ('json', 'yaml', and 'ini' files are possible) flags set in `env` will override what is in the file
 * @param {("server"|"client")} type type of build. This will overried both the `env` flag and what is in the `options` file
 * @param {boolean} isProd `true` if the build is a production build. This will override both the `env` flag and what is in the `options` file.
 * @param {boolean} [returnWebpackConfig=false] if `true`, returns a webpack config 
 * @returns {WPACK.CONFIG} a config object to be used in `buildConfig`
 */
export default function getPreset( env:WPACK.ENV, optionsFilename:string, type:"server"|"client", isProd:boolean, returnWebpackConfig:boolean):WEBPACK.CONFIG;
export default function getPreset( env:WPACK.ENV, optionsFilename:string, type:"server"|"client", isProd:boolean):WPACK.CONFIG;
export default function getPreset
	( env:WPACK.ENV
	, optionsFilename:string
	, type:"server"|"client"
	, isProd:boolean
	, returnWebpackConfig:boolean=false
	):WPACK.CONFIG | WEBPACK.CONFIG
	{
		const isServer = (type=='server');
		const defFlags = Env_to_Opts( env );
		const wpack_conf = Opts_to_WpackConf
			( extend
				( {}
				, defFlags
				,	{ bundleName:`${defFlags.bundleName}.${type}`
					, outputPath:isServer ? `${defFlags.outputPath}` : `${defFlags.outputPath}/public`
					, isServer
					, isProd
					}
				)
			, optionsFilename
			);

		return returnWebpackConfig ? buildConfig(wpack_conf) : wpack_conf;
	}