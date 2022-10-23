const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {TestConnection} = require('../databases/init.mongodb_multi')


const otpSchema = new Schema({
    email : String,
    otp : String,
    time : {type : Date,default : Date.now,index : {expires : 20}}
},{
    collection : 'otp',
}
);


module.exports = TestConnection.model('otp',otpSchema)



