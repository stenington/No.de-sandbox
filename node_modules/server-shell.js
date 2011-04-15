var http = require('http');

exports.createServer = function createServer(port, host) {
  var self = {};

  var server = http.createServer(function(req, res) {
    delegate(req, res);
  });

  self.setDelegate = function(aDelegate) {
    delegate = aDelegate;
  };
  
  server.listen(port, host); 

  return self;
}

