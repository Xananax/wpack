export default function resolve
	( extensions:string[]
	):WEBPACK.Resolve
	{
		return (
			{ extensions:[''].concat(extensions.map(ext=>`.${ext.replace(/^\.+/,'')}`))
			, modulesDirectories:
				[ 'node_modules'
				, 'shared'
				]
			}
		)
	}