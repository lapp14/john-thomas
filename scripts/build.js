
const fs = require('fs');
const DIST_DIR = 'dist/';

fs.rmdirSync(DIST_DIR, { recursive: true });

// fs.copyFileSync('src/*', )