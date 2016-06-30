import {MarkupLoader} from './Loader';
import babelConfig from './Loader/babel';

const html = function html
	( o:WPACK.Loader
	, opts:WPACK.Loader
	)
	{

		const loaders = 
			[ 
			];
		return MarkupLoader('markdown',['htm','html'],loaders,o);
	} as WPACK_INTERNAL.MarkupLoaderGenerator;

html.type = 'markup';
export default html;