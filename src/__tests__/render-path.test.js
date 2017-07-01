const path = require('path');
const MemoryFileSystem = require('memory-fs');
const renderPath = require('../render-path');

const TARGET_DIR = path.join(path.resolve(__dirname), 'dist');

function renderPage(path) {
    return `<h1>${path}</h1>`;
}

[
    {url: '/section/page1', file: '/section/page1/index.html'},
    {url: '/section/page2/', file: '/section/page2/index.html'},
    {url: '/section/page2/index.html', file: '/section/page2/index.html/index.html'}
]
.forEach(({url, file}) => {
    test(`should render url: ${url} to file: ${file}`, () => {
        const fs = new MemoryFileSystem();
        renderPath({
            dir: TARGET_DIR,
            renderer: renderPage,
            url,
            fs
        });
        const fileContent = fs.readFileSync(path.join(TARGET_DIR, file));
        expect(fileContent.toString()).toBe(renderPage(url));
    });
});

test('should return rendered file path', () => {
    const fs = new MemoryFileSystem();
    const indexPath = renderPath({
        dir: TARGET_DIR,
        renderer: renderPage,
        url: '/test/f1/',
        fs
    });
    const fileContent = fs.readFileSync(indexPath);
    expect(fileContent.toString()).toBe(renderPage('/test/f1/'));
});
