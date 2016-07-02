import preset from '../preset';
import webpackCompile from '../webpack/compile';

const compile = function compile
	( env:WPACK.ENV
	, optionsFileName:string
	, taskFlags:{prod:boolean,server:boolean}
	, callback:(err?:Error)=>void
	)
	{
		let conf;
		try{
			conf = preset(env,optionsFileName,taskFlags.server?'server':'client',taskFlags.prod,true)
			webpackCompile(conf,callback);
		}catch(e){
			return callback(e);
		}
	} as WPACK_INTERNAL.Task;

compile.flags = 
	[ '-p, --prod',['production mode',false]
	, '-s, --server',['server mode',false]
	]
compile.help = `compiles the files`
compile.alias = 'c';
export default compile;