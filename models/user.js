var mongoose = require('mongoose');
var { Schema } = mongoose;

var Schema = new Schema({
    username:{
        required : true,
        type     : String
    },
    
    email:{
        type : String,
        required : true,
    },
    
 password:{
    type : String,
            required : true
 }
    
},{timestamps    : true,versionKey:false});



var users = module.exports = mongoose.model('User',Schema);
module.exports.get = function(callback,limit){
    users.find(callback).limit(limit);
}