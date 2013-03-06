var fs = require('fs'),
    path = require('path')
var i = 100;
function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            name: path.basename(filename),
            id : Date.now() + path.basename(filename),
            data :{
              $color : "hsl(215, 100%, 50%)" 
            } 
        };

    if (stats.isDirectory()) {
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
            i
        });
    } else {

    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2]), false, null));
}