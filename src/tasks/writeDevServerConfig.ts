import multiWatcher from '../webpack/devServer/multiConfig';
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

export default function writeMultiConfig(outputFilename:string,o?:WPACK.ENV,optionsFilename?:string){
	const {server,client} = multiWatcher(o,optionsFilename);
	const requires = [];
	const server_raw = replace('server',server.config_raw,requires);
	const client_raw = replace('client',client.config_raw,requires);

	const raw = requires.join('\n')+
			+sep('server')
			+server_raw
			+sep('client')
			+client_raw
			+`\n\nmodule.exports = {client,server}`;
			;
	if(outputFilename){
		fs.writeFileSync(outputFilename,raw);
	}else{
		console.log(raw);
	}
}