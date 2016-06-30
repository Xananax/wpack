import {URLLoader} from './Loader';

const images = function images	
	( o:WPACK.Loader
	, opts:WPACK.URLLoader
	){

		return URLLoader('images',['png','jpg','jpeg','gif','svg'],o,opts)

	} as WPACK_INTERNAL.URLLoaderGenerator;

images.type = 'url';

export default images;