import buildConfig from './buildConfig';
import devServer from './devServer';
import entry from './entry';
import modules from './modules';
import node from './node';
import output from './output';
import plugins from './plugins';
import postcss from './postcss';
import resolve from './resolve';

export
	{ buildConfig
	, devServer
	, entry
	, modules
	, node
	, output
	, plugins
	, postcss
	, resolve
	}

export * from './utils';
export * from './loaders'
export default buildConfig;