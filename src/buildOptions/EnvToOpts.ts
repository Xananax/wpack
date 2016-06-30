import EnvOptsToOpts from './EnvOptsToOpts';
import EnvToEnvOpts from './EnvToEnvOpts';

export default function EnvToOpts
	( O?:WPACK.ENV
	, optionsFileName?:string
	):WPACK.OPTS
	{
		return EnvOptsToOpts(EnvToEnvOpts(O),optionsFileName);
	};