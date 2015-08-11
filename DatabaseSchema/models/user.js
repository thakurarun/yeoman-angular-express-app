var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password: { type: String },//select: false
    LastLogin: Date,
    IsActive: Boolean,
    CreateDate: { type: String, default: Date.now }
});
userSchema.statics.authenticate = function (credentials, callback) {
    this.findOne({ Email: credentials.email }, function (err, user) {
        if (err)
            return callback(err);
        else {
            if (!user) {
                return callback(null, { IsSuccess : false, Message : "User not found." });
            }
            else {
                if (user.Password == credentials.password)
                    return callback(null, { IsSuccess : true, User : user });
                return callback(null, { IsSuccess : false, Message : "Wrong password." });
            }
        }
    });
}
userSchema.statics.findByCriteria = function (criteria){
    var promise = this.findOne(criteria);
    return promise;
}
exports.User = mongoose.model('User', userSchema);