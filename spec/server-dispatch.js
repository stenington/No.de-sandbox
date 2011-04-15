var HOST = "localhost";
var PORT = "8097";

var dispatch = require('server-dispatch');
var serverShell = require('server-shell');
var testRig = require('test-rig');


var runnerWideServer = serverShell.createServer(PORT, HOST);
testRig.pointAt(PORT, HOST);

describe("server dispatch rest api", function(){
  beforeEach(function() {
    runnerWideServer.setDelegate(dispatch.RequestHandler());
  });

  afterEach(function() {
    runnerWideServer.setDelegate(null);
  });

  it("should return 404 when first piece of path isn't a module", function(){
    testRig.request("GET", "/foo", function(response){
      expect(response.statusCode).toEqual(404);
    });
  });

  it("should return 404 when first piece of path is a module, but not in 'dispatch_targets'", function(){
    testRig.request("GET", "/http", function(response){
      expect(response.statusCode).toEqual(404);
    });
  });

  it("should return 200 when path is a module in 'dispatch_targets' with no further path", function(){
    testRig.request("GET", "/test", function(response, message){
      expect(response.statusCode).toEqual(200);
      expect(message).toEqual("Yeah, that module is there.\n");
    });
  });
});
