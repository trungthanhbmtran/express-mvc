const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const {TestConnection} = require('../databases/init.mongodb_multi')

const UserSchema = new Schema({
    email : {
        type : String,
        lowercase : true,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},{
    collection : 'user',
    timestamps : true
}
);

UserSchema.pre('save',async function(next){
    try {
        console.log(`called before save :::`,this.email,this.password);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isCheckPassword =async function (password){
    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        
    }
}

// const UserSchema01 = new schema({
//     email : {
//         type : String,
//         lowercase : true,
//         unique : true,
//         required : true
//     },
//     password : {
//         type : String,
//         required : true
//     }
// })

// module.exports = {
//     test : TestConnection.model('user',UserSchema),
//     user : UserConnection.model('user',UserSchema01)
// }



module.exports = TestConnection.model('user',UserSchema)



