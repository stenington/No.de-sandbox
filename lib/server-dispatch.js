var url = require('url');

exports.RequestHandler = function RequestHandler(){
  return function handler(req, res) {
    var reqUrl = url.parse(req.url);
    var module = reqUrl.pathname.split("/", 2)[1];
    try {
      require.resolve("../dispatch_targets/" + module); // .. is lame
      if (reqUrl.pathname.split('/').length > 2) {
        // actually call stuff
      }
      else {
        res.writeHead('200 OK', {'Content-Type': 'text/plain'});
        res.end("Yeah, that module is there.\n");
      }
    }
    catch(err) {
      res.writeHead('404 Not Found', {'Content-Type': 'text/plain'});
      res.end();
    }
  };
};
