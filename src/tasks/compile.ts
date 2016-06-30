import preset from '../preset';
import * as webpack from 'webpack';
import * as extend from 'extend';

export default function compile(configFile:string,isProd:boolean=false,isServer:boolean=false){
	const config = preset(configFile,isProd,isServer);
	const compiler = webpack(config);
}