import * as extend from 'extend';
import getClientConfig from './client';

/**
 * 
 * 
 * Shortcut function to create configurations
 * The exported configuration is *not* a webpack suitable config;
 * It still must be fed to `buildConfig` before being usable.
 * 
 * This shortcut creates a web development build. Any flag pertaining to type of build in the passed env or in the options file are overriden.
 * 
 * @param {WPACK.ENV} env an environment object. No need to pass process.env, it is automatically used
 * @param {string} optionsFilename a supplementary options file ('json', 'yaml', and 'ini' files are possible) flags set in `env` will override what is in the file
 * @param {boolean} [returnWebpackConfig=false] if `true`, returns a webpack config
 * @returns {WPACK.CONFIG} a config object to be used in `buildConfig`
 */
export default function getWebConfigDevelopment(env:WPACK.ENV, optionsFilename:string, returnWebpackConfig:boolean):WEBPACK.CONFIG;
export default function getWebConfigDevelopment(env:WPACK.ENV, optionsFilename:string):WPACK.CONFIG;
export default function getWebConfigDevelopment
	( env:WPACK.ENV
	, optionsFilename:string
	, returnWebpackConfig:boolean=false
	):WPACK.CONFIG | WEBPACK.CONFIG
	{
		return returnWebpackConfig ? getClientConfig(env,optionsFilename,false,true) : getClientConfig(env,optionsFilename,false);
	}