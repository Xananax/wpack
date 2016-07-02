/**
 * Creates a `globals` object to be used in a webpack config.
 * 
 *  
 * @param {boolean} isProd `true` if building a production build
 * @param {boolean} isServer `true` if building a server build
 * @param {string[][]} files an array of [fileName,filePath]
 * @param {*} globals an object of globals
 * @returns an object with each key uppercased and surrounded with '__':
 * ```
 * { ___DEV___:"true"
 * , ___CLIENT___:"true"
 * , ___ENV___:"\"development\""
 * //...etc
 * }
 * ```
 */
export default function buildGlobs(isProd:boolean,isServer:boolean,globals?:any,files?:string[][]){

	const isDev = !isProd;
	const isClient = !isServer;
	const isDevServer = isClient && isDev;
	const ENV = isProd ? 'production' : 'development';

	const GLOBS = {
		'process.env.NODE_ENV':JSON.stringify(ENV)
	};

	( globals ? 
		Object.keys(globals).map
			( name=>[ name , globals[name] ] ) :
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
	.concat(files||[])
	.filter(Boolean)
	.forEach(function([name,value]){
		GLOBS[`__${name.toUpperCase()}__`] = JSON.stringify(value);
	})

	return GLOBS;
}