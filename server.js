var HOST = "rubato.no.de";
var PORT = 80;

var dispatch = require('root-handler');
var rig = require('server-rig');

var rig = rig.createDelegatingServer(PORT, HOST);
rig.delegateTo(dispatch.create());
