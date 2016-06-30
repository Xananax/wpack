import Loader from './Loader';

export default function CodeLoader
	( name:string
	, extensions:string[]
	, specificCodeLoader:string|any[]
	, o:WPACK.Loader
	, opts:WPACK.CodeLoader
	)
	{

		const includeReact = !o.isProd && !o.isServer && o.react;
		const loaders = 
			[ includeReact && [ 'react-hot' ]
			, specificCodeLoader
			]
		return Loader(name,'code',extensions,loaders,o)
	}