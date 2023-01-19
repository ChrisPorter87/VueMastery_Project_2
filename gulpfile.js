/// <binding ProjectOpened='runDefault' />
const path = require('path');
const compiler = require('crutch-compiler');
const { watch, series, parallel } = require('gulp');
const shell = require('gulp-shell');
const del = require('del');

const appPath = path.join(__dirname);
const entryFolder = '/js/entries'; // this is the default used by compiler.crutchPack()
const compiledCssFolder = 'compiledCss'; // this is the default used by compiler.crutchSass()

/** Add custom (webpack) aliases to the object below. Then add the object to the script compile tasks(s).
 * You will also need to add a "paths" property to the tsconfig (see tsconfig.json for the example below).
 */
const customAliases = {
    'components': path.resolve(__dirname, 'vue-components')
}

function compileSass() {
    return compiler.crutchSass();
};

function cleanCompiledCss(cb) {
    const deletedFiles = del.sync([`${compiledCssFolder}/**/*`]);

    console.log('Deleted files:', deletedFiles);

    cb();
}

function watchSass(cb) {
    console.log('\x1b[32m%s\x1b[0m', 'Style watcher started');

    // do an initial run
    console.log('\x1b[33m%s\x1b[0m', 'Running initial compilation');
    series(compileSass)();

    watch('./styles/**/*', series(compileSass));

    cb();
}

function compileScripts(cb) {
    compiler.crutchPack({ appPath, callback: cb, customAliases, entryFolder });
}

function compileScriptsProduction(cb) {
    compiler.crutchPack({ appPath, callback: cb, compilerMode: 'production', customAliases, entryFolder });
}

function watchScripts(cb) {
    console.log('\x1b[32m%s\x1b[0m', 'Script watcher started');

    compiler.crutchPack({ appPath, callback: cb, customAliases, entryFolder, watchFiles: true });

    cb();
}

function dev(cb) {
    const tasks = parallel(cleanCompiledCss, watchSass, watchScripts);

    watch('./package.json', { event: 'change' }, function endTask(cb) {
        console.log('\x1b[33m%s\x1b[0m', 'Package.json has changed, restart default task.');

        cb();

        process.exit(0);
    });

    tasks();

    cb();
}

exports.runDefault = shell.task('npm run default');
exports.compileSass = compileSass;
exports.watchSass = watchSass;
exports.compileScripts = compileScripts;
exports.watchScripts = watchScripts;
exports.buildDev = series(cleanCompiledCss, compileSass, compileScripts);
exports.buildProd = series(cleanCompiledCss, compileSass, compileScriptsProduction);
exports.dev = dev;