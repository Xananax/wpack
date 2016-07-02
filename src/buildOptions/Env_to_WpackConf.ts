import Opts_to_WpackConf from './Opts_to_WpackConf';
import Env_to_Opts from './Env_to_Opts';

/**
 * 
 * 
 * @param {WPACK.ENV} [ENV]
 * @param {string} [optionsFileName]
 * @returns {WPACK.CONFIG}
 */
export default function Env_to_WpackConf
	( ENV?:WPACK.ENV
	, optionsFileName?:string
	):WPACK.CONFIG
	{
		return Opts_to_WpackConf(Env_to_Opts(ENV),optionsFileName);
	};