import defaultsProvider from '../utils/defaultsProvider';


export default function EnvToEnvOpts
	( O:WPACK.ENV
	):WPACK.ENV_OPTIONS
	{

		const calling_dir = process.cwd();
		const env = process.env;
		const def = defaultsProvider([O,env]);
		const NODE_ENV = def('NODE_ENV','development');

		return (
			{ isProd:            def('PROD',(NODE_ENV == 'production'))
			, isServer:          def('SERVER',false)
			, react:             def('REACT',true)
			, vendors:           def('VENDORS',[])
			, hotPort:           def('HOTPORT',8080)
			, hostname:          def('HOSTNAME','0.0.0.0')
			, outputContext:     def('DIROUT',calling_dir)
			, sources:           def('DIRSRC','src')
			, storage:         ( def('STORAGE','disk') as WPACK.STORAGE_TYPE )
			, devtool:         ( def('DEVTOOL','source-map') as WPACK.DEVTOOL_TYPE )
			, debug:             def('DEBUG',false)
			, loaders:           def('LOADERS','*')
			, outputPath:        def('DESTINATION','dist')
			, stylesDestination: def('STYLES','styles')
			, bundleName:        def('BUNDLE','bundle')
			, sourceFile:        def('SOURCE','index.js')
			, copyFrom:          def('COPYFROM','')
			, copyTo:            def('COPYTO','')
			, imagesOutput:      def('IMAGESOUT','')
			, imagesLimit:       def('IMAGESLIMIT',0)
			, fontsOutput:       def('FONTSOUT','')
			, fontsLimit:        def('FONTSLIMIT',0)
			, urlOutput:         def('URLOUT','')
			, urlLimit:          def('URLLIMIT',0)
			}
		)

	}

