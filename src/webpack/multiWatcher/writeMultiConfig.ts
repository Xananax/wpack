import multiConfig from './multiConfig';
import * as fs from 'fs';

function collectRequires(requires:string[],str:string){
	if(requires.indexOf(str)>=0){return '';}
	requires.push(str);
	return '';
}

function replace(name:string,raw:string,requires:string[]){
	return raw
		.replace('module.exports',`const ${name}`)
		.replace(/const .+\s=\srequire\(.*?\);/g,(str)=>collectRequires(requires,str))
}

function sep(name:string){
	return `\n\n\n// --- ${name} --------------------------`
}

/**
 * 
 * Writes a multiDevServer config to a path
 * 
 * @param {string} [outputFilename] the file to write to. If none is provided, no file will be written
 * @param {WPACK.ENV} [env] an env object to generate the config
 * @param {string} [optionsFilename] an options file to generate the config
 * @param {WPACK_INTERNAL.DevServerMembers<any,any>} [compilers] already set compilers if they exist (in which case, `env` and `optionsFilename` are not used)
 * @returns {string}
 */
export default function writeMultiConfig
	( outputFilename?:string
	, env?:WPACK.ENV
	, optionsFilename?:string
	, compilers?:WPACK_INTERNAL.DevServerMembers<any,any>
	):string
	{
		const {server,client} = compilers || multiConfig(env,optionsFilename);
		const requires = [];
		const server_raw = replace('server',server.config_raw,requires);
		const client_raw = replace('client',client.config_raw,requires);
		const client_bundle_path = client.bundle_path;
		const server_bundle_path = server.bundle_path;

		const raw = requires.join('\n')+
				+sep('server')
				+server_raw
				+sep('client')
				+client_raw
				+'\n'
				+`const client_bundle_path = "${client_bundle_path}";\n`
				+`const server_bundle_path = "${server_bundle_path}";\n`
				+`\n\nmodule.exports = {client,server,client_bundle_path,server_bundle_path}`;
				;
		if(outputFilename){
			fs.writeFileSync(outputFilename,raw);
		}
		return raw;
	}