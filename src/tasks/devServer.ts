import multiWatcher from '../webpack/multiConfig';
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
	return `\n\n// --- ${name} --------------------------\n`
}

export default function devServer(o?:WPACK.ENV,optionsFilename?:string){
	const {server,client} = multiWatcher(o,optionsFilename);
	const requires = [];
	const server_raw = replace('server',server.config_raw,requires);
	const client_raw = replace('client',client.config_raw,requires);

	const raw = requires.join('\n')+
			+sep('server')
			+server_raw
			+sep('client')
			+client_raw
			+`\n\nmodule.exports = [client,server]`;
			;
	fs.writeFileSync('webpack-test.js',raw);

	console.log(server.bundle_path);
}