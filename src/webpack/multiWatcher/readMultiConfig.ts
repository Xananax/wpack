import * as fs from 'fs';

/**
 * 
 * Reads a multiDevServer config from a file
 * 
 * @param {string} filePath
 * @returns {WPACK_INTERNAL.DevServerMembers<void,void>}
 */
export default function readMultiConfig
	( filePath:string
	):WPACK_INTERNAL.DevServerMembers<void,void>
	{

		try{

			const ret:{
				server:any;
				client:any;
				client_bundle_path:string;
				server_bundle_path:string;
			} = require(filePath);

			return (
				{ server:
					{ config:ret.server
					, config_raw:null
					, bundle_path:ret.server_bundle_path
					, compiler:null
					, watcher:null
					}
				, client:
					{ config:ret.client
					, config_raw:null
					, bundle_path:ret.client_bundle_path
					, compiler:null
					, watcher:null
					}
				}
			)

		}catch(e){
			throw e;
		}
	}