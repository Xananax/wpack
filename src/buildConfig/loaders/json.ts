import {DataLoader} from './Loader';
import babelConfig from './Loader/babel';

const json = function json
	( o:WPACK.Loader
	, opts:WPACK.Loader
	)
	{

		const loaders = 
			[ 
			];
		return DataLoader('json',['json'],loaders,o);
	} as WPACK_INTERNAL.DataLoaderGenerator;

json.type = 'data';
export default json;