
export default function buildEntry(o:WPACK.OPTS){

	const 
		{ isProd
		, isDev
		, isServer
		, isClient
		, react
		, bundleName
		, sourceFile
		, hasVendors
		} = o;

	const includeHot = isDev;
	const hot = isServer ? 
		'webpack/hot/poll?1000':  
		`webpack-hot-middleware/client?path=${o.hot_url}/__webpack_hmr`
	;

	const vendor = hasVendors &&
		{ vendor:
			[ 'react'
			, 'redux'
			, 'react-redux'
			, ...o.vendor
			].filter(Boolean)
		}

	const mainFile = 
		{ [bundleName]:
			[ hot 
			, sourceFile
			].filter(Boolean)
		}

	return Object.assign(mainFile,vendor);
}