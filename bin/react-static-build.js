#!/usr/bin/env node
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const colors = require('colors/safe');
const program = require('commander');
const packageJSON = require('../package.json');
const webpack = require('webpack');
const {
    getClientWebpackConfig,
    getServerWebpackConfig
} = require('../src/get-webpack-config');
const renderPath = require('../src/render-path');
const validateStaticBuildEntry = require('../src/validate-static-build-entry');

const printf = (str) => console.log(str);

function throwError(errorMessage) {
    console.error(colors.red(errorMessage));
    process.exit(1);
}

function getStaticBuilderEntry(stats) {
    const staticBuilderEntry = _.get(stats, 'assetsByChunkName.staticBuilderEntry');
    if (_.isEmpty(staticBuilderEntry)) {
        throwError('Webpack config should contain entry.staticBuilderEntry');
    }
    return staticBuilderEntry;
}

function renderPages(buildDirectory, urls, renderer) {
    urls.forEach((url) => {
        renderPath({
            dir: buildDirectory,
            renderer,
            url
        }).then((renderedFilePath) => {
            const relativeRenderedFilePath = path.relative(process.cwd(), renderedFilePath);
            printf(`Render ${colors.green(url)} to ${colors.green(relativeRenderedFilePath)}`);
        });
    });
}

function main() {
    program
        .version(packageJSON.version)
        .option('-d, --dir <path>', 'Build directory')
        .option('-c, --config <path>', 'Webpack config')
        .parse(process.argv);

    if (!program.config) {
        program.outputHelp();
        process.exit(1);
    }

    const getWebpackConfig = require(path.resolve(program.config));
    const clientWebpackConfig = getClientWebpackConfig(getWebpackConfig);
    const serverWebpackConfig = getServerWebpackConfig(getWebpackConfig);

    const builderTempOutputDirectory = serverWebpackConfig.output.path;
    let buildDirectory = program.dir;
    if (!buildDirectory) {
        buildDirectory = clientWebpackConfig.output.path;
    }

    const relativeBuildDirectoryPath = path.relative(process.cwd(), buildDirectory);
    printf(`Using ${colors.green(relativeBuildDirectoryPath)} as build directory...`);

    const compiler = webpack([clientWebpackConfig, serverWebpackConfig]);
    compiler.run((err, stats) => {
        const statsObject = stats.toJson();
        const serverBundleStats = statsObject.children.find((stat) => stat.name === 'serverBundle');
        const staticBuilderEntry = getStaticBuilderEntry(serverBundleStats);
        const staticBuilderScript = require(path.join(builderTempOutputDirectory, staticBuilderEntry));
        validateStaticBuildEntry(staticBuilderScript);
        const {urls, renderer} = staticBuilderScript.default;
        renderPages(buildDirectory, urls, renderer);
        printf(`Remove temp directory ${colors.green(builderTempOutputDirectory)}`);
        fs.removeSync(builderTempOutputDirectory);
    });
}

if (!module.parent) {
    main();
}
