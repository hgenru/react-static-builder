const path = require('path');
const getWebpackConfig = require('./fixtures/webpack-simple-config');
const {getServerWebpackConfig} = require('../get-webpack-config');

test(`should return obect from passed function`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    expect(serverWebpackConfig.entry.index).toBe('./foo.js');
});

test('should throw error when webpack config doesn\'t have output.path', () => {
    expect(
        () => getServerWebpackConfig(() => ({}))
    ).toThrow('Webpack config should contain output.path');
});

test(`should return config with name "serverBundle"`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    expect(serverWebpackConfig.name).toBe('serverBundle');
});

test(`should return config with libraryTarget === commonjs2`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    expect(serverWebpackConfig.output.libraryTarget).toBe('commonjs2');
});

test(`should return config with target === node`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    expect(serverWebpackConfig.target).toBe('node');
});

test(`should setup output folder`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    const originalOutputPath = getWebpackConfig().output.path;
    expect(serverWebpackConfig.output.path).toBe(path.join(originalOutputPath, '.static-build-tmp'));
});

test(`should setup output filename`, () => {
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);
    expect(serverWebpackConfig.output.filename).toBe('static-build.js');
});

test(`should pass isServerBundle to webpack config funcion`, () => {
    expect.assertions(1);
    const getConfig = ({staticBuilderEnv}) => {
        expect(staticBuilderEnv).toBe('server');
    };
    try {
        getServerWebpackConfig(getConfig);
    } catch (err) {}
});
