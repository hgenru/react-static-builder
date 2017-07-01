const path = require('path');

module.exports = () => ({
    entry: {index: './foo.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
});
