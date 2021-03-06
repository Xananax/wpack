import * as mime from 'mime';
import * as webpack from 'webpack';
import webpackWatcher from './watcher';

const parseRange = require('range-parser');
const HASH_REGEXP = /[0-9a-f]{10,}/;

export function pathJoin(a, b) {
		return a == "/" ? "/" + b : (a||"") + "/" + b
}

export function handleRangeHeaders(content, req, res) {
	if (req.headers['Accept-Ranges']) res.setHeader('Accept-Ranges', 'bytes');
	if (req.headers.range) {
		var ranges = parseRange(content.length, req.headers.range);

		// unsatisfiable
		if (-1 == ranges) {
			res.setHeader('Content-Range', 'bytes */' + content.length);
			res.statusCode = 416;
			return content;
		}

		// valid (syntactically invalid/multiple ranges are treated as a regular response)
		if (-2 != ranges && ranges.length === 1) {
			// Content-Range
			res.statusCode = 206;
			var length = content.length;
			res.setHeader(
				'Content-Range',
				'bytes ' + ranges[0].start + '-' + ranges[0].end + '/' + length
			);

			content = content.slice(ranges[0].start, ranges[0].end + 1);
		}
	}
	return content;
}

export function _getFilenameFromUrl(outputPath,publicPath,url){
	// publicPrefix is the folder our bundle should be in
	var localPrefix = publicPath || "/";
	if(url.indexOf(localPrefix) !== 0) {
		if(/^(https?:)?\/\//.test(localPrefix)) {
			localPrefix = "/" + localPrefix.replace(/^(https?:)?\/\/[^\/]+\//, "");
			// fast exit if another directory requested
			if(url.indexOf(localPrefix) !== 0) return false;
		} else return false;
	}
	// get filename from request
	var filename = url.substr(localPrefix.length);
	if(filename.indexOf("?") >= 0) {
		filename = filename.substr(0, filename.indexOf("?"));
	}
	return filename ? pathJoin(outputPath, filename) : outputPath;
}

/**
 * Returns a webpack middleware, comparable to the official
 * webpack-dev-middleware.
 *  
 * @param  {webpack compiler} compiler
 * @param  {Object} options an object of options
 * @param  {WwebpackWatcher} [watcher] a WebpackWatcher object
 */
export default function middleware
	( compiler:webpack.compiler.Compiler
	, options:any
	, watcher?:WPACK_INTERNAL.Watcher
	):WPACK_INTERNAL.WebpackDevMiddleWare
	{

		const fs = compiler.outputFileSystem;

		const getFilenameFromUrl = _getFilenameFromUrl.bind
			( null
			, (compiler as any).outputPath
			, options.publicPath
			);
		watcher = watcher || webpackWatcher('webpack',compiler,options);

		const {watch,waitUntilValid,invalidate,close,ready,rebuild} = watcher;


		const webpackDevMiddleware = function(req, res, next){

			var filename = getFilenameFromUrl(req.url);

			if (filename === false)
				{ return next(); }

			if(options.lazy && (!options.filename || options.filename.test(filename)))
				{ rebuild(); }

			if(HASH_REGEXP.test(filename)) {
				try {
					if(fs.statSync(filename).isFile()) {
						processRequest();
						return;
					}
				} catch(e) {}
			}
			// delay the request until we have a vaild bundle
			ready(processRequest, req);

			function processRequest() {
				try {
					var stat = fs.statSync(filename);
					if(!stat.isFile()) {
						if (stat.isDirectory()) {
							filename = pathJoin(filename, "index.html");
							stat = fs.statSync(filename);
							if(!stat.isFile()) throw "next";
						} else {
							throw "next";
						}
					}
				} catch(e) {
					return next();
				}

				// server content
				var content = fs.readFileSync(filename);
				content = handleRangeHeaders(content, req, res);
				res.setHeader("Access-Control-Allow-Origin", "*"); // To support XHR, etc.
				res.setHeader("Content-Type", mime.lookup(filename));
				res.setHeader("Content-Length", content.length);
				if(options.headers) {
					for(var name in options.headers) {
						res.setHeader(name, options.headers[name]);
					}
				}
				if (res.send) res.send(content);
				else res.end(content);
			}
		} as WPACK_INTERNAL.WebpackDevMiddleWare

		webpackDevMiddleware.getFilenameFromUrl = getFilenameFromUrl;
		webpackDevMiddleware.waitUntilValid = waitUntilValid;
		webpackDevMiddleware.invalidate = invalidate;
		webpackDevMiddleware.close = close;
		webpackDevMiddleware.watch = watch;
		webpackDevMiddleware.fileSystem = fs;

		return webpackDevMiddleware;

	}