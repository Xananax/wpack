import makeWatcher from '../utils/watcher';
import multiCompiler from './multiCompiler';
import * as webpack from 'webpack';

/**
 * 
* Creates two configurations from one single wpack conf and/or env
 * 
 * The configurations are similar, only one is set for a server output, the 
 * other for a browser output.
 * 
 * @param {WPACK.ENV} [env] And env object; no need to pass `process.env`, it is automatically used
 * @param {string} [optionsFilename] a filename of options to load
 * @param {WPACK_INTERNAL.DevServerMembers<any,any>} [compilers] if the compilers were already set, then they can be used instead of new ones being created
 * @returns {WPACK_INTERNAL.DevServerMembers} an object of configurations. The object has two members:`server` and `client`. Each member has the following signature:
 * ```js
 * { config: a webpack config
 * , config_raw: a webpack config as a string
 * , bundle_path: the absolute path to the bundle
 * , compiler: webpack compiler
 * , watcher: WPACK_INTERNAL.Watcher
 * }
 * ```  
 */
export default function multiWatcher
	( env?:WPACK.ENV
	, optionsFilename?:string
	, compilers?:WPACK_INTERNAL.DevServerMembers<any,any>
	):WPACK_INTERNAL.DevServerMembers<any,WPACK_INTERNAL.Watcher>
	{

		const {server,client} = compilers || multiCompiler<WPACK_INTERNAL.Watcher>(env,optionsFilename);

		server.watcher = server.watcher ||  makeWatcher(`webpack [server]`,server.compiler,server.config.devServer);
		client.watcher = client.watcher || makeWatcher(`webpack [client]`,client.compiler,client.config.devServer);

		return (
			{ server
			, client
			}
		)


	}