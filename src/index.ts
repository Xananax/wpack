import buildOptions from './buildOptions';
import buildConfig from './buildConfig';
import fs = require('fs');

const config = buildConfig(buildOptions(),true);

fs.writeFileSync('./webpack.config.js',config,{encoding:'utf8'});