const createError = require('http-errors')
// routes.use('/user',require('./user')),
// routes.use('/order',require('./order'))
const User = require('../Models/User.model')
const {signAccessToken,signRefreshToken,verifyRefreshToken} =require('../helpers/jwt_services')
const {userValidate} = require('../helpers/validation')

const {
    register, verifyOTp, registerOTP
} = require('../Services/user.service')

const {
    REDIS_DEL,REDIS_GET
} = require('../Services/redis.service')



// const client =require('../databases/init.redis')

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
            const {code,message,elements} = await registerOTP({email,password})
            return res.json({
                code, 
                message,
                elements 
            })
        } catch (error) {
            next(error)
        }
    },
    register :  async (req,res,next)=>{
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
    refreshToken :  async (req,res,next) => {
        try {
            // console.log(req.body)
            const {refreshToken} = req.body
            if(!refreshToken) throw createError.BadRequest()
    
            const {userId} = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
    
            // if(!refToken) throw createError.BadRequest();
            res.json({
                accessToken,
                refreshToken: refToken
            })
        } catch (error) {
            next(error)
        }
    },
    login : async (req,res,next)=>{
        try {
            const {error} = userValidate(req.body)
            const {email,password} = req.body
            if(error){
                throw createError(error.details.at(0).message)
            }
            const user = await User.findOne({email})
            if(!user){
                throw createError.NotFound('User not registered')
            }
    
            const isValid = await user.isCheckPassword(password)
            // console.log('isValid',isValid)
            if(!isValid){
                throw createError.Unauthorized()
            }
            const accessToken =await signAccessToken(user._id)
            const refreshToken =await signRefreshToken(user._id)
    
            res.json({
                accessToken,
                refreshToken
            })
    
        } catch (error) {
            next(error)
        }
    },
    logout : async (req,res,next)=>{
        try {
            const {refreshToken} = req.body
            if(!refreshToken){
                throw createError.BadRequest()
            }
            const {userId} = await verifyRefreshToken(refreshToken)
            
            const result = await REDIS_DEL(userId.toString())
            res.json({
                result
            })
        } catch (error) {
            next(error)
        }
    },
    getlist : async (req,res,next)=>{
        // console.log(req.headers)
        const listUsers = [
            {
                email : 'abc@gmail.com'
            },
            {
                email : 'def@gmail.com'
            }
        ]
        res.json({
            listUsers
        })
    }
}