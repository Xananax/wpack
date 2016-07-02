import preset from '../../preset/config';
import buildConfig from '../../buildConfig';

/**
 * 
 * Creates two configurations from one single wpack conf and/or env
 * 
 * The configurations are similar, only one is set for a server output, the 
 * other for a browser output.
 * 
 * @param {WPACK.ENV} [env] And env object; no need to pass `process.env`, it is automatically used
 * @param {string} [optionsFilename] a filename of options to load
 * @returns {WPACK_INTERNAL.DevServerMembers} an object of configurations. The object has two members:`server` and `client`. Each member has the following signature:
 * ```js
 * { config: a webpack config
 * , config_raw: a webpack config as a string
 * , bundle_path: the absolute path to the bundle
 * , compiler: null
 * , watcher: null
 * }
 * ```  
 */
export default function multiConfig<C,W>
	( env?:WPACK.ENV
	, optionsFilename?:string
	):WPACK_INTERNAL.DevServerMembers<C,W>
	{
		const server_options = preset(env,optionsFilename,'server',false);
		const client_options = preset(env,optionsFilename,'client',false);
		const server_config = buildConfig(server_options);
		const client_config = buildConfig(client_options);
		const server_config_raw = buildConfig(server_options,true);
		const client_config_raw = buildConfig(client_options,true);

		const server_files = server_options.files;
		const client_files = client_options.files;

		const server_bundle_path = server_files['bundle_absolute']
		const client_bundle_path = client_files['bundle_absolute']
		
		const server_name = `webpack [server]`;
		const client_name = `webpack [client]`;

		return (
			{ server:
				{ config:server_config
				, config_raw:server_config_raw
				, bundle_path:server_bundle_path
				, compiler:null
				, watcher:null
				}
			, client:
				{ config:client_config
				, config_raw:client_config_raw
				, bundle_path:client_bundle_path
				, compiler:null
				, watcher:null
				}
			}
		)
		
	}