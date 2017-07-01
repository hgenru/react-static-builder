const co = require('co');
const path = require('path');
const nodeFS = require('fs');
const mkdirp = require('mkdirp');

/**
 * @param {Object} {dir, url, renderer, fs} 
 * @returns {string} indexPath
 */
const renderPath = co.wrap(function* ({dir, url, renderer, fs}) {
    const xfs = fs || nodeFS;
    const indexDir = path.join(dir, url);
    const indexPath = path.join(indexDir, 'index.html');
    const pageContent = yield renderer(url);
    mkdirp.sync(indexDir, {fs: xfs});
    xfs.writeFileSync(indexPath, pageContent, {flag: 'w'});
    return indexPath;
});

module.exports = renderPath;
