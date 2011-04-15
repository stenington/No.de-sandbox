var HOST = "rubato.no.de";
var PORT = 80;

var dispatch = require('server-dispatch');
var shell = require('server-shell');

var shell = shell.createServer(PORT, HOST);
shell.setDelegate(dispatch.RequestHandler());
