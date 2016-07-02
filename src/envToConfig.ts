import * as extend from 'extend';
import buildOptions from './buildOptions';
import buildConfig from './buildConfig';

export default function generateConfig
	( env:WPACK.ENV
	, optionsFileName:string
	)
	{

		const wpack_conf = buildOptions(env,optionsFileName);
		return buildConfig(wpack_conf);

	}