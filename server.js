var HOST = "rubato.no.de";
var PORT = 80;

var http = require('http');

function Server(delegate) {
  var self = {};

  var server = http.createServer(function(req, res) {
    delegate(req, res);
  });

  self.setDelegate = function(aDelegate) {
    delegate = aDelegate;
  };
  
  server.listen(PORT, HOST); /* this is slow, we only want to do it once for the test run */

  return self;
}

function RequestHandler() {
  return function handler(req, res) {
    res.writeHead('404 Not Found', {'Content-Type': 'text/plain'});
    res.end('NO U' + req.path.toUpperCase() + '\n');
  };
};

var no_u = Server();
no_u.setDelegate(RequestHandler());
