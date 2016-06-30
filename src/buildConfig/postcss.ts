import addRequires from './utils/addRequires'

export function doesUseCSS(types:WPACK.LOADER_TYPE[]):boolean{
	const usesCSS = types.some(type=>type=='style');
	return usesCSS;
}

export function buildPostcssRaw(requires:any,types:WPACK.LOADER_TYPE[]){
	addRequires(requires,'autoprefixer','AutoPrefixer');
	return `function postCss(){[AutoPrefixer(${JSON.stringify(autoPrefixerOpts())})]}`;
}

export function autoPrefixerOpts(){
	return (
		{ browsers: [ 'last 2 versions' ]
		}
	)
}

export default function buildPostcss(types:WPACK.LOADER_TYPE[]){

	const usesCSS = doesUseCSS(types);

	if(!usesCSS){return;}
	return ()=>
		[ require('autoprefixer')(autoPrefixerOpts())
		]

}