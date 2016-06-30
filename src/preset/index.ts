import config from './config';
import client_dev from './client.dev';
import client_prod from './client.prod';
import server_dev from './server.dev';
import server_prod from './server.prod';
import * as extend from 'extend';

export 
	{ client_dev
	, client_prod
	, server_dev
	, server_prod
	}

export const client = 
	{ dev:client_dev
	, prod:client_prod
	}

export const server = 
	{ dev:server_dev
	, prod:server_prod
	}

function preset(O?:WPACK.ENV,configFile?:string,isProd:boolean=false,isServer:boolean=false){
	const configType = (isServer ? server : client);
	const configMaker = isProd ? configType.prod : configType.dev;
	const config = configMaker(O,configFile);
	return config;
}


const builds = extend
	( preset
	, { client, server}
	);

export default preset;