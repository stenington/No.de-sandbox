Just playing with no.de.

- - -

To publish: 

The idea is to build out a request handling scheme that maps RESTful calls to a pluggable set of response handlers. 

So:

    whatever.no.de -> ?
    whatever.no.de/ -> ?
    whatever.no.de/module -> checks module availability, but doesn't call
    whatever.no.de/module/ -> invokes module's handle method with url /module/
    whatever.no.de/module/path -> invokes module's handle method with url /module/path
    whatever.no.de/module/path/ -> invokes module's handle method with url /module/path/
    whatever.no.de/module/path/more_path -> invokes module's handle method with url /path/more_path
    ...etc.

Served modules live in `node_modules/SERVED/` and must implement a `handleRequest(req, res)` method.
