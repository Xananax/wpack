import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import isError from '../utils/isError';

export function open(filename:string):string|Error{
	try{
		return fs.readFileSync(filename,{encoding:'utf8'});
	}catch(e){
		return e;
	}
}

export function fromYMLFile(filename:string):any|Error{
	const raw = open(filename);
	if(!raw){return;}
	if(isError(raw)){
		return raw;
	}else{
		try{
			return yaml.safeLoad(raw);
		}catch(e){
			return e;
		}
	}
}

export function fromJSONFile(filename:string):any|Error{
	const raw = open(filename);
	if(!raw){return;}
	if(isError(raw)){
		return raw;
	}else{
		try{
			return JSON.parse(raw);
		}catch(e){
			return e;
		}
	}
}

export function fromINIFile(filename:string):any|Error{
	const raw = open(filename);
	if(!raw){return;}
	if(isError(raw)){
		return raw;
	}
	else{
		try{
			return ini.parse(raw);
		}catch(e){
			return e;
		}
	}
}

export function fromAnyFile(filename:string):any|Error{
	const ext = path.extname(filename).toLowerCase().replace(/^\./,'');
	switch(ext){
		case 'ini': 
			return fromINIFile(filename);
		case 'json': 
			return fromJSONFile(filename);
		case 'yml':
		case 'yaml':
			return fromYMLFile(filename);
		default:
	}
};

export default function fromFile(filename:string,doThrow:boolean=false):any{
	if(!filename){return;}
	const ret = fromAnyFile(filename);
	if(isError(ret)){
		if(doThrow){throw ret;}
		return;
	}
	return ret;
}