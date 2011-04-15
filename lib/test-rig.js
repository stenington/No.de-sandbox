var http = require('http');

var host = 'localhost';
var port = '80';

exports.pointAt = function pointAt(targetPort, targetHost){
  port = targetPort;
  host = targetHost;
};

exports.request = function request(method, path, responseCallback){
  asyncSpecWait();
  var options = {
    host: host,
    port: port,
    method: method,
    path: path
  };
  var req = http.request(options, function(res) {
    var chunks = [];
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });
    res.on('end', function() {
      responseCallback(res, chunks.join());
      asyncSpecDone();
    });
  });
  req.end();
};
