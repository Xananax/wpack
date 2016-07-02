import * as webpack from 'webpack';
import webpackErrorHandler from './utils/webpackErrorHandler';

export default function compile(config:WEBPACK.CONFIG,callback?:(err?:Error)=>void){
	const compiler = webpack(config as any,function(err,stats){
		webpackErrorHandler(err,stats,function(err){
			if(callback){return callback(err);}
			else if(err){ throw err; }
		});
	});
}