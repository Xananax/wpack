import * as fs from 'fs';
import generate_text from './generate'

const write = function
	( env:WPACK.ENV
	, optionsFileName:string
	, flags:{prod:boolean,server:boolean,output:string}
	, callback:(err:Error,config?:string)=>void
	)
	{
		generate_text(env,optionsFileName,null,function(err,config){
			if(err){return callback(err);}
			if(!flags.output){
				return callback(null,config);
			}
			fs.writeFile(flags.output,config,{encoding:'utf8'},function(err){
				if(err){return callback(err);}
				return callback(null,config);
			});
		});
	} as WPACK_INTERNAL.Task;

write.flags = 
	[ '-p, --prod',['production mode',false]
	, '-s, --server',['server mode',false]
	, '-o, --output',['output file','webpack.conf.js']
	]
write.alias = 'r';
write.help = 'generates a webpack config and writes it to disk';
export default write;