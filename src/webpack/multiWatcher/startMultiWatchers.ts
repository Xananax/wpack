import multiWatcher from './multiWatcher';
import multiConfig from './multiConfig';
import readMultiConfig from './readMultiConfig';

export default function startMultiWatchers
	( env?:WPACK.ENV
	, envFileName?:string
	, webpackConfigFilename?:string
	, compilers?:WPACK_INTERNAL.DevServerMembers<any,WPACK_INTERNAL.Watcher>
	)
	{

		if(!compilers){
			if(webpackConfigFilename){
				compilers =  multiWatcher(env,envFileName,readMultiConfig(webpackConfigFilename))
			}else{
				compilers = multiWatcher(env,envFileName);
			}
		}
		
		const {client,server} = compilers;
		const server_bundle_path = server.bundle_path;
		const client_bundle_path = client.bundle_path;

		function startWatching(onReady?:(err:Error,paths:{server:string;client:string})=>void){

			client.watcher.watch(function(){

				console.log(`webpack [client]: client file created at \`${client_bundle_path}\``);

				server.watcher.watch(function(){
					console.log(`webpack [server]: server path \`${server_bundle_path}\``);
					onReady
						( null
						,	{ server:server_bundle_path
							, client:client_bundle_path
							}
						);
				});

			});

		}

		return startWatching;


	}