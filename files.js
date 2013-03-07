var fs = require('fs'),
    path = require('path'),
    colors = [
    "#003366",
    "#003399",
    "#006699",
    "#0066cc",
    "#3399cc",
    "#3399ff",
    "#99ccff"
  ]
var i = 100;
function dirTree(filename, level) {
    var stats = fs.lstatSync(filename),
        info = {
            name: path.basename(filename),
            id : Date.now() + path.basename(filename),
            data :{
              $color : colors[level] 
            } 
        };
    if (stats.isDirectory()) {
        console.log("directory");
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child, level +1);
        });
    } else {
    
    }
console.log(level)
    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2],0), false, null));
}