
const calling_dir = process.cwd();

const defaultOpts:WPACK.OPTIONS = 
	{ hostname:'hostname'
	, hotPort:80080
	, isProd:false
	, isServer:false
	, outputContext:calling_dir
	, sources:'src'
	, storage:'disk'
	, devtool:'source-map'
	, debug:false
	, react:true
	, loaders:'*'
	, outputPath:'js'
	, stylesDestination:'css'
	, bundleName:'bundle'
	, sourceFile:'index.js'
	, copyFrom:''
	, copyTo:''
	}


export default defaultOpts;