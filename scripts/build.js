
const fs = require('fs-extra');
const DIST_DIR = 'dist/';

// Remove dist directory if needed, then remake
fs.rmdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(DIST_DIR);

// Copy source directory
fs.copy('src/', DIST_DIR, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});
