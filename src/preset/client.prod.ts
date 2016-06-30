import * as extend from 'extend';
import getConfig from './config';
import 
	{ ENV_PRODUCTION
	, ENV_DEVELOPMENT 
	} from '../utils/consts';

export default function getWebConfigProduction
	( O:WPACK.ENV
	, file:string
	)
	{
		return getConfig(O,file,'client',true);
	}