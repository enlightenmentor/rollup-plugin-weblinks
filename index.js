const url = require('url');
const request = require('sync-request');

function isAbsolute ( importee ) {
  const link = url.parse(importee);
  return link.protocol && link.host;
}

function addJsExtensionIfNecessary ( file ) {
  const parts = file.split('?');
  if (!parts[0].endsWith('.js'))
    return parts[0]+'.js'+ (parts.length > 1) ? parts[1] : '';
  return file;
}

module.exports = function () {
  return {
    resolveId: function (importee, importer) {
      console.log('our resolveId');
      // external modules (non-entry modules that start with neither '.' or '/')
      // are skipped at this stage.
      if (importer !== undefined && !isAbsolute(importee) && importee[0] !== '.' && importee[0] !== '/') { return null; }

      // `resolve` processes paths from right to left, prepending them until an
      // absolute path is created. Absolute importees therefore shortcircuit the
      // resolve call and require no special handing on our part.
      // See https://nodejs.org/api/path.html#path_path_resolve_paths
      return addJsExtensionIfNecessary(importer ? url.resolve(importer, importee) : importee);
    },
    load: function (id) {
      console.log('our load');
      const resp = request('GET', id);
      return resp.getBody().toString();
    },
    
  };
}