import express from 'express';
import * as core from "express-serve-static-core";
import HandlerWrapper from '../utils/HandlerWrapper';
import * as webpack from 'webpack';

const webpackHotMiddleware  = require('webpack-hot-middleware');

export interface SwappableExpress extends core.Express, WPACK_INTERNAL.SwappableHandler{}

export default function createApp
	( publicPath:string
	, contentBase:string
	, compiler:webpack.compiler.Compiler
	):SwappableExpress
	{
		const app = express() as SwappableExpress;
		const wrappedHandler = HandlerWrapper();

		app.use(webpackHotMiddleware(compiler));

		app.use(express.static(contentBase));
		
		app.use(wrappedHandler);

		app.swap = function(handler){
			wrappedHandler.swap(handler);
			return app;
		}

		return app;
	}