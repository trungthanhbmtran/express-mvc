const createError = require('http-errors')
// routes.use('/user',require('./user')),
// routes.use('/order',require('./order'))
const User = require('../Models/User.model')
const {signAccessToken,signRefreshToken,verifyRefreshToken} =require('../helpers/jwt_services')
const {userValidate} = require('../helpers/validation')

const {
    register, verifyOTp
} = require('../Services/user.service')

const client =require('../databases/init.redis')

module.exports={
    // register : async (req,res,next)=>{
    //     try {
    //         const {email,password} = req.body
    //         const {error} = userValidate(req.body)
    
    //         // console.log(error)
    //         if(error){
    //             throw createError(error.details.at(0).message)
    //         }
    //         // if(!email || !password){
    //         //     throw createError.BadRequest()
    //         // }
    
    //         const isExits = await User.findOne({
    //             email  
    //         })
    
    //         if(isExits){
    //             throw createError.Conflict(`${email} is ready been registered`)
    //         }
    
    //         const user = new User({
    //             email,
    //             password
    //         })
    
            
    //         const savedUser = await user.save()
    
    //         return res.json({
    //             status : 'okay',
    //             elements : savedUser
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // },
    verifyOtp : async(req,res,next)=>{
        try {
            const {email,otp} = req.body
            const {code,elements,message} = await verifyOTp({email,otp})
            return res.json({
                code, 
                message,
                elements 
            })
        } catch (error) {
            next(error)
        }
    },
    registerOTP :  async (req,res,next)=>{
        try {
            const {email,password} = req.body
            // console.log('req.body',req.body)
            const {error} = userValidate(req.body)
            if(error){
                throw createError(error.details.at(0).message)
            }
            const {code,message,elements} = await register({email,password})
            return res.json({
                code, 
                message,
                elements 
            })
        } catch (error) {
            next(error)
        }
    },
   
}