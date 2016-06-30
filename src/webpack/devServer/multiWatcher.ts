import makeWatcher from '../utils/watcher';
import multiCompiler from './multiCompiler';

export default function multiWatcher
	( o:WPACK.ENV
	, optionsFilename?:string
	):WPACK_INTERNAL.DevServerMembers
	{

		const {server,client} = multiCompiler(o,optionsFilename);

		server.watcher = makeWatcher(server.name,server.compiler,server.config.devServer);
		client.watcher = makeWatcher(client.name,client.compiler,client.config.devServer);

		return (
			{ server
			, client
			}
		)


	}