import * as extend from 'extend';
import EnvToEnvOpts from '../buildOptions/EnvToEnvOpts';
import EnvOptsToOpts from '../buildOptions/EnvOptsToOpts';
import buildConfig from '../buildConfig';

export default function getPreset
	( o:WPACK.ENV
	, optionsFilename:string
	, type:"server"|"client"
	, isProd:boolean
	):WPACK.OPTS
	{
		const isServer = (type=='server');
		const defFlags = EnvToEnvOpts( o );
		return EnvOptsToOpts
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
			)
	}