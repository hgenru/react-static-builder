const co = require('co');
const fs = require('fs-extra');
const path = require('path');
const {execFile} = require('child-process-promise');

const execPath = path.resolve(__dirname, '../react-static-build.js');
const dirPath = path.resolve(__dirname, 'dist');
const webpackConfigPath = path.resolve(__dirname, 'fixtures', 'webpack.config.js');

afterAll(() => {
    fs.removeSync(dirPath);
});

test('should start via execFile with exit code 1', co.wrap(function* () {
    const err = yield execFile(execPath).catch((err) => err);
    expect(err.code).toBe(1);
}));

test('should provide help if no args passed', co.wrap(function* () {
    const err = yield execFile(execPath).catch((err) => err);
    expect(err.stdout).toContain('Usage: react-static-build [options]');
}));

test('should print build directory from webpack config', co.wrap(function* () {
    const proc = yield execFile(execPath, ['--config', webpackConfigPath]);
    expect(proc.stdout).toContain('Using bin/__tests__/fixtures/dist as build directory...');
}));

test('should render html\'s', co.wrap(function* () {
    const proc = yield execFile(execPath, ['--config', webpackConfigPath]);
    expect(proc.stdout).toContain('Using bin/__tests__/fixtures/dist as build directory...');
}));
