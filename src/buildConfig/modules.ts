const preLoaders = 
	[
		{ test: /\.js$/
		, loader: "source-map-loader" 
		}
	] 

export default function modules(config:WPACK.OPTS,loaders:WPACK_INTERNAL.Loader[]):any{

	const {isProd,isDev} = config;

	if(isDev){
		return (
			{ noParse:/\.min\.js$/
			, loaders
			}
		)
	}else{
		return (
			{ preLoaders
			, loaders
			}
		)
	}

}