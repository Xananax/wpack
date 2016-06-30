import Loader from './Loader';

export default function DataLoader
	( name:string
	, extensions:string[]
	, specificCodeLoader:string|any[]
	, o:WPACK.Loader
	)
	{
		const loaders = 
			[ ['json-loader']
			, specificCodeLoader
			].filter(Boolean);
		return Loader(name,'data',extensions,loaders,o)
	}