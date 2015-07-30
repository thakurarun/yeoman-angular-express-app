/*
	Author - Dipin Behl
	Comments - Loads all the Mongoose models defined on the server.
*/

var fs = require('fs');

module.exports = function () {
    
    var models_path = __dirname + '/models';
    var walk = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            var newPath = path + '/' + file;
            var fileStatus = fs.statSync(newPath);
            if (fileStatus.isFile()) {
                if (/(.*)\.(js$)/.test(file)) {
                    require(newPath);
                }
            }
            else if (fileStatus.isDirectory()) {
                walk(newPath);
            }
        });
    };
    walk(models_path);
	
}