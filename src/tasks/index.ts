import compile from './compile';
import generate from './generate';
import server from './server';
import watch from './watch';
import write from './write';

const tasks:{[taskName:string]:WPACK_INTERNAL.Task} =
	{ compile
	, generate
	, server
	, watch
	, write
	}

export default tasks;