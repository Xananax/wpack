import {DataLoader} from './Loader';
import babelConfig from './Loader/babel';

const yaml = function yaml
	( o:WPACK.Loader
	, opts:WPACK.Loader
	)
	{

		const loaders = 
			[ 'yaml-loader'
			];
		return DataLoader('yaml',['yaml','yml'],loaders,o);
	} as WPACK_INTERNAL.DataLoaderGenerator;

yaml.type = 'data';
export default yaml;