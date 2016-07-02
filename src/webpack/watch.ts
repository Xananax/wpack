import * as webpack from 'webpack';
import webpackWatcher from './utils/watcher';
import webpackErrorHandler from './utils/webpackErrorHandler';
import {makeDevServerOptions} from '../buildConfig/devServer';

export default function compile(config:WEBPACK.CONFIG,options?:any,callback?:(err?:Error)=>void){
	options = makeDevServerOptions(options);
	const compiler = webpack(config as any,callback);
	webpackWatcher('webpack',compiler,options);
}