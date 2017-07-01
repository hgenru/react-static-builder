const validateStaticBuildEntry = require('../validate-static-build-entry');

test('should throw error if entry script not have ulrs propery', () => {
    expect(
        () => validateStaticBuildEntry()
    ).toThrow(/Entry should export default {urls, renderer}/);
});
