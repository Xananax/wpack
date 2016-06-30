require("source-map-support").install()
//const server = require('./dist/index.js').default;
const run = require('./dist/tasks/devServer').default;

run();