var Path = require('path'),
    _ = require('lodash');

exports.register = function (server, options, next) {
    // if options is not given, create version cache from package.json version. else use the options as the cache version
    if(_.isEmpty(options)){
        // Get the version of the application that loads this module.
        var packageVersionNumber = require(Path.join(__dirname, '../..') + "/package.json").version;

        // Replace all characters except numbers.
        var versionCache = packageVersionNumber.replace(/[^0-9]/g, "");
    } else {
        var versionCache = options;
    }

    // Hook onto the 'onPostHandler'
    server.ext('onPostHandler', function (request, reply) {
        // Get the response object
        var response = request.response;

        // Check to see if the response is a view
        if (response.variety === 'view') {
                if(_.isEmpty(response.source.context.version)){
                    response.source.context.version = {};
                }
                response.source.context.version.cache = '?v=' + versionCache;
        }
        return reply.continue();
    });
    return next();
};

exports.register.attributes = {
    pkg: require("./package.json")
};