const isBuild = process.argv[2] === 'build';

const { FuseBox, CSSPlugin, SassPlugin, BabelPlugin, UglifyJSPlugin, EnvPlugin } = require("fuse-box");
const plugins = [
    [SassPlugin(), CSSPlugin()],
    BabelPlugin(),
];

if (isBuild) {
    plugins.push([EnvPlugin({NODE_ENV: "production"}), UglifyJSPlugin()])
}

// Create FuseBox Instance
let fuse = new FuseBox({
    homeDir: "src/",
    sourcemaps: !isBuild,
    outFile: "./build/out.js",
    plugins: plugins
});

if (isBuild) {
    fuse.bundle(">index.js");
} else {
    fuse.devServer(">index.js");
}
