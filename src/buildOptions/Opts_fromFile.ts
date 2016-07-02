import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import isError from '../utils/isError';

export function open
	( filename:string
	):string|Error
	{
		try{
			return fs.readFileSync(filename,{encoding:'utf8'});
		}catch(e){
			return e;
		}
	}

export function fromYMLFile
	( filename:string
	):any|Error
	{
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

export function fromJSONFile
	( filename:string
	):any|Error
	{
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

export function fromINIFile
	( filename:string
	):any|Error
	{
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

export function fromAnyFile
	( filename:string
	):any|Error
	{
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

/**
 * 
 * Loads a file of WPACK.OPTIONS.
 * 
 * The file can be json, yaml, or ini
 * 
 * @param {string} filename any file path
 * @param {boolean} [doThrow=false] if `true`, the function will throw on errors
 * @returns {WPACK.OPTIONS|undefined}
 */
export default function Opts_fromFile
	( filename:string
	, doThrow:boolean=false
	)
	:WPACK.OPTIONS
	{
		if(!filename){return;}
		const ret = fromAnyFile(filename);
		if(isError(ret)){
			if(doThrow){throw ret;}
			return;
		}
		return ret;
	}