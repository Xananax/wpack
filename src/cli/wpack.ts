#!/usr/bin/env node
import * as commander from 'commander';
const PKG = require('../../package.json');
const {name,version} = PKG;

function range(val) {
	return val.split(' ');
}

function list(val) {
	return val.split(',');
}

commander
	.usage('[options]')
	.option('-P, --prod','switch to production mode',false)
	.option('-p, --hot-port <port>','the port on which to run the dev server',8080)
	.option('-h, --hostname <name>','the hostname of the dev server','0.0.0.0')
	.option('-S, --server','create a server config, otherwise a client config file',false)
	.option('-o, --out <dir>','determines the output directory','./dist')
	.option('-s, --src <dir>','determines the input directory','./src')
	.option('-v, --devtool <devtool>','which source map tool to use','source-map')
	.option('-b, --debug', 'set debug mode',true)
	.option('-r,--react','bundle react files as a separate bundle',true)
	.option('-l, --loaders <list>','which loaders to load',list,'all')
	.option('-d, --dest', 'destination','dist')
	.option('-c, --style-name','name of style bundle (if applicable)','style.css')
	.option('-j, --bundle','name of the generated bundle','bundle')
	.option('-s, --source','name of the source file','index.js')
	.option('-c, --copy <from> <to>','copy files from <from> to <to>',range)
	.option('-v, --vendors','add external modules',list)
	.option('-n --dry-run','Simulate but don\'t do anything')

commander
	.command('write [file]')
		.alias('w')
		.description('write configuration to file')
		.action(function(env,options){
			console.log(env)
			console.log(options.parent.dryRun);
		});
	
commander
	.command('dev-server')
	.alias('s')
		.description('start the dev server')
		.action(function(env,options){

		});

commander
	.parse(process.argv);