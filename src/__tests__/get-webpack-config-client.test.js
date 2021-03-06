const getWebpackConfig = require('./fixtures/webpack-simple-config');
const {getClientWebpackConfig} = require('../get-webpack-config');

test('should return obect from passed function', () => {
    const clientWebpackConfig = getClientWebpackConfig(() => ({entry: {index: 'test'}}));
    expect(clientWebpackConfig.entry.index).toBe('test');
});

test('should return config name "clientBundle"', () => {
    const clientWebpackConfig = getClientWebpackConfig(getWebpackConfig);
    expect(clientWebpackConfig.name).toBe('clientBundle');
});

test('should delete entry.staticBuilderEntry from client config', () => {
    const clientWebpackConfig = getClientWebpackConfig(getWebpackConfig);
    expect(clientWebpackConfig.entry.staticBuilderEntry).toBeUndefined();
});

test(`should pass isServerBundle to webpack config funcion`, () => {
    expect.assertions(1);
    const getConfig = ({staticBuilderEnv}) => {
        expect(staticBuilderEnv).toBe('client');
    };
    try {
        getClientWebpackConfig(getConfig);
    } catch (err) {}
});
