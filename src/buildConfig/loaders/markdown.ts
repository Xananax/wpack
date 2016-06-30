import {MarkupLoader} from './Loader';
import babelConfig from './Loader/babel';

const md = function markdown
	( o:WPACK.Loader
	, opts:WPACK.Loader
	)
	{

		const loaders = 
			[ 'markdown-loader'
			];
		return MarkupLoader('markdown',['md','markdown'],loaders,o);
	} as WPACK_INTERNAL.MarkupLoaderGenerator;

md.type = 'markup';
export default md;