module.exports = {
    testPathIgnorePatterns: ['/.cache/', '/node_modules/', '/public/'],
    setupFiles: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    collectCoverageFrom: ['src/**/*.js'],
    moduleNameMapper: {
        '\\.(png|scss|svg)$': 'identity-obj-proxy'
    }
};
