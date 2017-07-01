const path = require('path');
const nodeFS = require('fs');
const mkdirp = require('mkdirp');

/**
 * @param {Object} {dir, url, renderer, fs} 
 * @returns {string} indexPath
 */
function renderPath({dir, url, renderer, fs}) {
    const xfs = fs || nodeFS;
    const indexDir = path.join(dir, url);
    const indexPath = path.join(indexDir, 'index.html');
    const pageContent = renderer(url);
    mkdirp.sync(indexDir, {fs: xfs});
    xfs.writeFileSync(indexPath, pageContent, {flag: 'w'});
    return indexPath;
}

module.exports = renderPath;
