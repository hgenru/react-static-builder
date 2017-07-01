const getWebpackConfig = require('./fixtures/webpack-simple-config');
const {getClientWebpackConfig} = require('../get-webpack-config');

test(`should return obect from passed function`, () => {
    const clientWebpackConfig = getClientWebpackConfig(() => ({entry: 'test'}));
    expect(clientWebpackConfig.entry).toBe('test');
});

test(`should return config name "clientBundle"`, () => {
    const clientWebpackConfig = getClientWebpackConfig(getWebpackConfig);
    expect(clientWebpackConfig.name).toBe('clientBundle');
});
