import preset from '../../preset/config';
import buildConfig from '../../buildConfig';

export default function multiConfig
	( o:WPACK.ENV
	, optionsFilename?:string
	):WPACK_INTERNAL.DevServerMembers
	{
		const server_options = preset(o,optionsFilename,'server',false);
		const client_options = preset(o,optionsFilename,'client',false);
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
				{ name:server_name
				, flags:server_options
				, config:server_config
				, config_raw:server_config_raw
				, bundle_path:server_bundle_path
				, compiler:null
				, watcher:null
				}
			, client:
				{ name:client_name
				, flags:client_options
				, config:client_config
				, config_raw:client_config_raw
				, bundle_path:client_bundle_path
				, compiler:null
				, watcher:null
				}
			}
		)
		
	}