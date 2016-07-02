import {startMultiWatchers} from '../webpack/multiWatcher';

const watch = function watch
	( env:WPACK.ENV
	, optionsFilename:string
	, taskFlags:any
	, callback:(err:Error,paths:{server:string,client:string})=>void
	)
	{

		const start = startMultiWatchers(env,optionsFilename);

		start(callback);

	}  as WPACK_INTERNAL.Task;


watch.alias = 'w';
watch.help = 'starts two watchers, one for the client and one for the server'
export default watch;