import preset from '../preset';
import buildConfig from '../buildConfig';

const generate = function generate
	( env:WPACK.ENV
	, optionsFileName:string
	, taskFlags:{prod:boolean,server:boolean}
	, callback:(err:Error,config?:string)=>void
	)
	{
		try{
			const wpack_conf = preset(env,optionsFileName,taskFlags.server?'server':'client',taskFlags.prod)
			const webpack_conf = buildConfig(wpack_conf,true);
			callback(null,webpack_conf);
		}catch(e){
			callback(e);
		}
		
	} as WPACK_INTERNAL.Task;

generate.flags = 
	[ '-p, --prod',['production mode',false]
	, '-s, --server',['server mode',false]
	]
generate.alias = 'gen';
generate.help = 'generates a text webpack config returns it'
export default generate;