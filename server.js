var HOST = "rubato.no.de";
var PORT = 80;

var dispatch = require('root-dispatch');
var rig = require('server-rig');

var rig = rig.createServer(PORT, HOST);
shell.delegateTo(dispatch.create());
