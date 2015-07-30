var mongoose = require('mongoose');

exports.repo = {
    insert : function (model, callback){
        //if (err)
        //    console.log("not able to insert in db.");
        model.save(function (err) { 
            if (err)
                callback(err)
        });
    }
}