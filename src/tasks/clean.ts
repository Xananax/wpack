import * as rimraf from 'rimraf';
import buildOptions from '../buildOptions';

const clean = function clean
	( env:WPACK.ENV
	, optionsFileName:string
	, taskFlags:any
	, callback:(err?:Error)=>void
	)
	{

		const options = buildOptions(env,optionsFileName);
		const dist = options.outputContext;
		rimraf(dist,callback);

	} as WPACK_INTERNAL.Task;
	
clean.help = `removes the distribution or temp directory`
export default clean;