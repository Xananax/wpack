import config_main from './config';
import client_main from './client';
import client_dev from './client.dev';
import client_prod from './client.prod';
import server_main from './server';
import server_dev from './server.dev';
import server_prod from './server.prod';

const client:WPACK_INTERNAL.PresetForType = client_main as WPACK_INTERNAL.PresetForType;
client.prod = client_prod;
client.dev = client_dev;

const server:WPACK_INTERNAL.PresetForType = server_main as WPACK_INTERNAL.PresetForType;
server.prod = server_prod;
server.dev = server_dev;

const preset:WPACK_INTERNAL.Preset = config_main as WPACK_INTERNAL.Preset;
preset.server = server;
preset.client = client;

export 
	{ client_dev
	, client_prod
	, server_dev
	, server_prod
	, client
	, server
	}

export default preset;