#!/usr/bin/env node

import * as commander from 'commander';
import tasks from '../tasks';

const PKG = require('../../package.json');
const {name,version} = PKG;

commander
	.description('Several helpers to create webpack configs or compile/preview files')
	.usage('[options]')

Object.keys(tasks).forEach(function(taskName){
	const task = tasks[taskName];
	const {alias,flags,help} = task;
	const command = commander.command(taskName);
	if(alias){
		command.alias(alias);
	}
	if(help){
		command.description(help);
	}
	if(flags && flags.length){
		flags.forEach(function([f,[desc,def]]){
			command.option(f,desc,def);
		})
	}
});

commander
	.parse(process.argv);