const _ = require('lodash');
const path = require('path');

/**
 * @param {Function} getWebpackConfig
 * @return {Object} webpackConfig
 */
function getServerWebpackConfig(getWebpackConfig) {
    const originalConfig = getWebpackConfig({staticBuilderEnv: 'server'});
    const originalConfigOutputPath = _.get(originalConfig, 'output.path');
    if (_.isEmpty(originalConfigOutputPath)) {
         throw new Error('Webpack config should contain output.path');
    }
    return _.merge(originalConfig, {
        name: 'serverBundle',
        target: 'node',
        output: {
            path: path.join(originalConfig.output.path, '.static-build-tmp'),
            filename: 'static-build.js',
            libraryTarget: 'commonjs2'
        }
    });
}

/**
 * @param {Function} getWebpackConfig
 * @return {Object} webpackConfig
 */
function getClientWebpackConfig(getWebpackConfig) {
    const config = _.merge(getWebpackConfig({staticBuilderEnv: 'client'}), {
        name: 'clientBundle'
    });
    config.entry = _.omit(config.entry, ['staticBuilderEntry']);
    return config;
}

module.exports = {getServerWebpackConfig, getClientWebpackConfig};
