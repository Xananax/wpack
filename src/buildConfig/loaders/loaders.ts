import css from './css';
import fonts from './fonts';
import html from './html';
import images from './images';
import js from './js';
import json from './json';
import less from './less';
import markdown from './markdown';
import scss from './scss';
import styl from './styl';
import ts from './ts';
import yaml from './yaml';
import * as extend from 'extend';

export const loaders:{[name:string]:WPACK_INTERNAL.LoaderGenerator<any,any>} = 
	{ css
	, fonts
	, images
	, js
	, less
	, scss
	, styl
	, ts
	, markdown
	, html
	, json
	, yaml
	}

export const loadersArray:WPACK_INTERNAL.LoaderGenerator<any,any>[] = Object.keys(loaders).map(name=>loaders[name]);

export const loadersByType:{[name:string]:WPACK_INTERNAL.LoaderGenerator<any,any>[]} = {};
loadersArray.forEach(
	loader=>
		(loadersByType[loader.type] = loadersByType[loader.type] || []).push(loader)
)

export function getLoaderGeneratorByType(config:WPACK.CONFIG,loaderType:string):WPACK_INTERNAL.Loader[]{
	if(!(loaderType in loadersByType)){return;}
	return loadersByType[loaderType].map(loader=>setLoader(config,loader));
}

export function getLoaderGeneratorByName(config:WPACK.CONFIG,name:string):WPACK_INTERNAL.Loader[]{
	if(!(name in loaders)){return;}
	return [setLoader(config,loaders[name])]
}

export function getLoader(config:WPACK.CONFIG,name:string){
	const loaders = getLoaderGeneratorByType(config,name) || getLoaderGeneratorByName(config,name);
	if(!loaders){
		throw new Error(`There is no configuration available for loader or loader type \`${name}\``);
	}
	return loaders;
}

export function setLoader(config:WPACK.CONFIG,loaderGenerator:WPACK_INTERNAL.LoaderGenerator<any,any>):WPACK_INTERNAL.Loader{
	const {type,name} = loaderGenerator;
	const additionalOptions = extend(true,{},config[type],config[name]);
	const loader = loaderGenerator(config,additionalOptions);
	return loader;
}


export default function getLoadersArray(config:WPACK.CONFIG):WPACK_INTERNAL.Loader[]{
	if(
		!config.loaders.length ||
		( 
			config.loaders.length == 1 &&
			(
				config.loaders[0] == '*' || config.loaders[0] == 'all'	
			)
		)
	){
		return loadersArray.map(loaderGenerator=>setLoader(config,loaderGenerator))
	}
	const loaders = 
		config.loaders.reduce
			( (ls,name) => 
				ls.concat( getLoader(config,name) )
			, []
			);

	return loaders;
}
