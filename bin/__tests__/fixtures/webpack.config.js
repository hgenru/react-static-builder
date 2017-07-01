const path = require('path');

module.exports = () => ({
    entry: {
        staticBuilderEntry: path.resolve(__dirname, './static-build-entry.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
});
