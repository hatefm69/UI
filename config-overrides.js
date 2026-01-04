const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        http: require.resolve("http-browserify"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        tty: require.resolve("tty-browserify"),
        zlib: require.resolve("browserify-zlib"),
        fs: false,
        url: require.resolve("url/"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        buffer: require.resolve("buffer/")
    };
  
    return config;
}