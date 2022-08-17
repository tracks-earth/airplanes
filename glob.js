const fs = require('fs')
const path = require('path')
 
function dirTree(filename = "") {
    const stats = fs.statSync(filename)
    const info = {
        path: filename,
        size: stats.size,
        // stats,
        // ctime: stats.ctime,
        // mtime: stats.mtime,
        type: stats.isDirectory() ? "folder" : "file",
        // var fileSizeInBytes = stats.size;
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.children = fs.readdirSync(filename)
            .map(function(child) {
                return dirTree(`${filename}/${child}`);
            });
    }
 
    return info;
}
 
if (module.parent == undefined) {
    // node glob.js ./models
    const obj = dirTree(process.argv[2])
    console.log(JSON.stringify(obj, null, 2));
}