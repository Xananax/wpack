import watch from './watch';
import createApp from '../utils/createApp';

const server = function server
	( env:WPACK.ENV
	, optionsFilename:string
	, taskFlags:any
	, callback:(err:Error,app:any)=>void
	)
	{
		watch(env,optionsFilename,null,function({server}){
			
			console.log(`webpack [server]: First compilation succeeded!`)
			const app = createApp();

			const server_app = require(server) || require(server).default;

			app.swap(server_app);

			if(module.hot){
				module.hot.accept([server],function(){
					app.swap(require(server) || require(server).default);
				})
			}

			callback(null,app);

		});

	}  as WPACK_INTERNAL.Task;

server.alias = 's'
server.help = 'runs a dev server with hot reloading on the server and client'
export default server;