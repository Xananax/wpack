import isBoolean from '../../utils/isBoolean';
import isFunction from '../../utils/isFunction';

/**
 * 
 * A simple webpack error handler which will take care of
 * throwing errors or warning. It should be used inside a `webpack(config,callback)` callback.
 * 
 * ```js
 * const compiler = webpack(config,function(err,stats){
 *     webpackErrorHandler(err,stats);
 * })
 * ```
 * 
 * @param {Error} [err=null] The Error returned by webpack
 * @param {*} stats the stats object returned by webpack
 * @param {callback|boolean)} [callbackOrDoThrow] Either a callback that receives an error, or `true` if you want errors thrown.
 * @returns
 */

interface webpackErrorHandlerCallback{
	(err?:Error):void
}
export default function webpackErrorHandler(err:Error=null,stats:any,callbackOrDoThrow?:boolean|webpackErrorHandlerCallback){

	let doThrow = false;
	let cb:webpackErrorHandlerCallback;
	if(isBoolean(callbackOrDoThrow) && callbackOrDoThrow){
		doThrow = true;
		cb = null;
	}else if(isFunction(callbackOrDoThrow)){
		cb = callbackOrDoThrow as webpackErrorHandlerCallback;
	}

	if(err){
		if(cb){
			return cb(err);
		}
		if(doThrow){
			throw err;
		}
		if(err instanceof Error){
			console.error(err.message);
		}else{
			console.error(err);
		}
		return;
	}

	const jsonStats = stats.toJson();

	if(jsonStats.errors.length > 0){
		jsonStats.errors.forEach(e=>console.error(e));
		if(cb){
			return cb(new Error(`webpack has errors`));
		}	
	}

	if(jsonStats.warnings.length > 0){
		jsonStats.warnings.forEach(e=>console.warn(e));
	}
	if(cb){
		return cb();
	}
}