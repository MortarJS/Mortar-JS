// Based on https://github.com/Khan/react-components/blob/master/test/compiler.js
var fs = require('fs'),
    ReactTools = require('react-tools'),
    origJs = require.extensions['.js'];

// A module that exports a single, stubbed-out React Component.
var reactStub = 'module.exports = require("react").createClass({render:function(){return null;}});';

// Should this file be stubbed out for testing?
function shouldStub(filename) {
  if (!global.reactModulesToStub) return false;

  // Check if the file name ends with any stub path.
  var stubs = global.reactModulesToStub;
  for (var i = 0; i < stubs.length; i++) {
    if (filename.substr(-stubs[i].length) == stubs[i]) {
      return true;
    }
  }
  return false;
}

// Transform a file via JSX/Harmony or stubbing.
function transform(filename) {
  if (shouldStub(filename)) {
    delete require.cache[filename];
    return reactStub;
  } else {
    var content = fs.readFileSync(filename, 'utf8');
    return ReactTools.transform(content, {harmony: true});
  }
}

// Install the compiler.
require.extensions['.js'] = function(module, filename) {
  // optimization: code in a distribution should never go through JSX compiler.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }

  return module._compile(transform(filename), filename);
};

module.exports = {
  transform: transform,
  shouldStub: shouldStub
};
