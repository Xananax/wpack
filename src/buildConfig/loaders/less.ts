import {StyleLoader} from './Loader';

const less = function less
	( o:WPACK.Loader
	)
	{

		return StyleLoader('less',['less'],'less-loader',o);

	} as WPACK_INTERNAL.StyleLoaderGenerator;

less.type = 'style';

export default less;