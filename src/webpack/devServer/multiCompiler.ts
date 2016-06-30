import multiConfig from './multiConfig';
import * as webpack from 'webpack';

export default function multiCompiler
	( o:WPACK.ENV
	, optionsFilename?:string
	):WPACK_INTERNAL.DevServerMembers
	{

		const {server,client} = multiConfig(o,optionsFilename);
		
		server.compiler = webpack(server.config);
		client.compiler = webpack(client.config);

		return (
			{ server
			, client
			} 
		)

		/*
		client_watcher.watch(function(){

			console.log(`${client_name}: client file created at \`${client_bundle_path}\``);

			server_watcher.watch(function(){
				
				console.log(`${server_name}: server path \`${server_bundle_path}\``);

				runDevServer(server_name,client_compiler,client_config,SERVER_CONSTS,server_bundle_path,fs,cb);
			});
		})
		*/
	}