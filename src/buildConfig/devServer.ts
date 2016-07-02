import * as extend from 'extend';

const defaults = 
	{ noInfo: true
	, quiet: false
	, lazy: false
	, publicPath: '/'
	, hot:
		{ overlay: false
		, reload: false
		}
	, stats:
		{ colors: true
		, reasons: true
		}
	, watchOptions:
		{ 
		/*
			aggregateTimeout: 300
		, poll: 1000
		*/
		}
	}

export default function buildDevServer
	( contentBase:string
	, port:number
	, conf:any
	):WEBPACK.DevServer
	{
		return makeDevServerOptions
			( extend
				( true
				, { contentBase, port }
				, conf
				)
			);
	}

export function makeDevServerOptions(options?:any){
	if(!options)
		{ options = {}; }
	if(typeof options.watchOptions === "undefined")
		{ options.watchOptions = {}; }
	if(typeof options.watchOptions.aggregateTimeout === "undefined")
		{ options.watchOptions.aggregateTimeout = 200; }
	if(typeof options.stats === "undefined")
		{ options.stats = {}; }
	if(!options.stats.context)
		{ options.stats.context = process.cwd(); }
	if(options.lazy && typeof options.filename === "string")
		{
			const str = options.filename
				.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
				.replace(/\\\[[a-z]+\\\]/ig, ".+");
			options.filename = new RegExp("^[\/]{0,1}" + str + "$");
		}
	return options;
}