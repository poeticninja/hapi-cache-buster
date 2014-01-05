var Hoek = require('hoek'),
    Path = require('path'),
    _ = require('lodash');

exports.register = function (plugin, options, callback) {
    // if options is not given, create version cache from package.json version. else use the options as the cache version
    if(_.isEmpty(options)){
        // Get the version of the application that loads this module.
        var packageVersionNumber = Hoek.loadPackage(Path.join(__dirname, '../..')).version;

        // Replace all characters except numbers.
        var versionCache = packageVersionNumber.replace(/[^0-9]/g, "");
    } else {
        var versionCache = options;
    }

    // Hook onto the 'onPostHandler'
    plugin.ext('onPostHandler', function (request, next) {
        // Get the response object
        var response = request.response();

        // Check to see if the response is a view
        if (response.variety === 'view') {
                if(_.isEmpty(response.view.context.version)){
                    response.view.context.version = {};
                }
                response.view.context.version.cache = '?v=' + versionCache;
        }
        next();
    });
};