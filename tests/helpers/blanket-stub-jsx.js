// Transform & instrument JS for Blanket coverage analysis.
// based on https://github.com/alex-seville/blanket/blob/master/src/node-loaders/coffee-script.js
'use strict';

var fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    transformer = require('./jsx-stub-transform');


module.exports = function(blanket) {

  var origJs = require.extensions['.js'];

  require.extensions['.js'] = function(localModule, filename) {
    // short-circuit for common case.
    if (filename.match(/node_modules/)) {
      return origJs(localModule, filename);
    }

    // React-ify as necessary.
    var content = transformer.transform(filename) ||
        fs.readFileSync(filename, 'utf8');

    // Don't instrument code unless it passes the filter & is non-stubby.
    var pattern = blanket.options('filter');
    var normalizedFilename = blanket.normalizeBackslashes(filename);
    if (transformer.shouldStub(filename) ||
        !blanket.matchPattern(normalizedFilename, pattern)) {
      localModule._compile(content, normalizedFilename);
      delete require.cache[normalizedFilename];  // might not be stubbed in the future.
      return;
    }

    blanket.instrument({
      inputFile: content,
      inputFileName: normalizedFilename
    }, function(instrumented){
      var baseDirPath = blanket.normalizeBackslashes(path.dirname(normalizedFilename)) + '/.';
      try {
        instrumented = instrumented.replace(/require\s*\(\s*("|')\./g,'require($1' + baseDirPath);
        localModule._compile(instrumented, normalizedFilename);
        delete require.cache[normalizedFilename];  // might be stubbed in the future.
      } catch(err){
        console.log("Error parsing instrumented code: " + err);
      }
    });
  };

  // Source all JS files so that they count towards the denominator.
  var antifilters = blanket.options('antifilter');
  var pattern = './' + blanket.options('filter') + '/**/*.js';
  glob.sync(pattern).forEach(function(path) {
    var pathFromRoot = path.slice(2);
    for (var i = 0; i < antifilters.length; i++) {
      var antifilter = antifilters[i];
      if (pathFromRoot.slice(0, antifilter.length) == antifilter) {
        return;
      }
    }

    require('../' + pathFromRoot);
  });
};
