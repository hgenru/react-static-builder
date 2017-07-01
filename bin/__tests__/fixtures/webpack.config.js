const path = require('path');

module.exports = () => ({
    entry: {
        index: path.resolve(__dirname, './static-build-entry.js'),
        staticBuilderEntry: path.resolve(__dirname, './static-build-entry.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
});
