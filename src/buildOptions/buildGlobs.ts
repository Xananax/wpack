export default function buildGlobs(isProd:boolean,isServer:boolean,files:string[][],globals:any){

	const isDev = !isProd;
	const isClient = !isServer;
	const isDevServer = isClient && isDev;
	const ENV = isProd ? 'production' : 'development';

	const GLOBS = {
		'process.env.NODE_ENV':JSON.stringify(ENV)
	};

	( globals ? 
		Object.keys(globals).map
			( name=>[ name.toUpperCase() , globals[name] ] ) :
		[]
	)
	.concat
		(
			[ [ 'DEV',      isDev ]
			, [ 'CLIENT',   isClient ]
			, [ 'SERVER',   isServer ]
			, [ 'PROD',     isProd ]
			, [ 'ENV',      ENV ]
			, [ 'DEV_SERVER',isDevServer ]
			]
		)
	.concat(files)
	.forEach(function([name,value]){
		GLOBS[`__${name}__`] = JSON.stringify(value);
	})

	return GLOBS;
}