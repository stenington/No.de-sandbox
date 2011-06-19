var HOST = "localhost";
var PORT = "8097";

var rootHandler = require('root-handler');
var server = require('server-rig');
var testRig = require('test-rig');

var runnerWideServer = server.createDelegatingServer(PORT, HOST);
testRig.pointAt(PORT, HOST);

describe("module dispatcher", function(){
  beforeEach(function() {
    runnerWideServer.delegateTo(rootHandler.create());
  });

  afterEach(function() {
    runnerWideServer.delegateTo(null);
  });

  it("should return 404 when first piece of path isn't a module", function(){
    testRig.request("GET", "/foo", function(response, message){
      expect(response.statusCode).toEqual(404);
      expect(message).toEqual("(>_<)\n");
    });
  });

  it("should return 404 when first piece of path is a module, but not a served module", function(){
    testRig.request("GET", "/http", function(response, message){
      expect(response.statusCode).toEqual(404);
      expect(message).toEqual("(>_<)\n");
    });
  });

  it("should return 200 and module present indicator when path is just an available module name", function(){
    testRig.request("GET", "/echo", function(response, message){
      expect(response.statusCode).toEqual(200);
      expect(message).toEqual("d(^_^)b\n");
    });
  });

  it("should pass on request handling to served modules with further pathing", function(){
    testRig.request("GET", "/echo/some/thing", function(response, message){
      expect(response.statusCode).toEqual(200);
      expect(message).toEqual("/echo/some/thing");
    });
  });

  it("should consider module plus a trailing slash as additional pathing", function(){
    testRig.request("GET", "/echo/", function(response, message){
      expect(response.statusCode).toEqual(200);
      expect(message).toEqual("/echo/");
    });
  });
});
