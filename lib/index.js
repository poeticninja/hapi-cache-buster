var Path = require('path');

exports.register = function (server, options, next) {
    var versionCache = options.version || null;

    if(!versionCache){
        // Get the version of the application that loads this module from the process current working directory.
        var packageVersionNumber = require(Path.join(process.cwd(), './package.json')).version;

        // Replace all characters except numbers.
        versionCache = packageVersionNumber.replace(/[^0-9]/g, "");
    }

    // Hook onto the 'onPostHandler'
    server.ext('onPostHandler', function (request, reply) {
        // Get the response object
        var response = request.response;

        // Check to see if the response is a view
        if (response.variety === 'view') {
                response.source.context = response.source.context || {};
                response.source.context.version = response.source.context.version || {};
                response.source.context.version.cache = '?v=' + versionCache;
        }
        return reply.continue();
    });
    return next();
};

exports.register.attributes = {
    pkg: require("../package.json")
};
