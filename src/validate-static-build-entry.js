const _ = require('lodash');

function validateStaticBuildEntry(entry) {
    const urls = _.get(entry, 'default.urls');
    const renderer = _.get(entry, 'default.renderer');
    if (!urls || !renderer) {
        throw new Error('Entry should export default {urls, renderer}' + urls + renderer);
    }
}

module.exports = validateStaticBuildEntry;
