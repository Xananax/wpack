import Loader from './Loader';

export default function MarkupLoader
	( name:string
	, extensions:string[]
	, specificCodeLoader:string|any[]
	, o:WPACK.Loader
	)
	{
		const loaders = 
			[ ['html-loader']
			, specificCodeLoader
			].filter(Boolean);
		return Loader(name,'markup',extensions,loaders,o)
	}