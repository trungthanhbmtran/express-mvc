//Models
const User = require('../Models/User.model')
const Otp = require('../Models/Otp.model')
const createError = require('http-errors')
const GeneratorOTP = require('../helpers/generate_otp')

const {signAccessToken,signRefreshToken,verifyRefreshToken} =require('../helpers/jwt_services')

//Services
const {
    insertOtp,
    validotp
}= require('./otp.service')
//utils
let that = module.exports ={
    verifyOTp : async ({email,otp}) =>{
        try {
            const otpHolder = await Otp.find({
                email
            })
            if(!otpHolder.length){
                // return {
                //     code :404,
                //     message : 'Expired OTP!!'
                // }
                return createError.NotFound('Expired OTP!!')
            }
            //get last Otp
            const lastOtp = otpHolder[otpHolder.length-1]
            const isValid = await validotp({
                otp,
                hashOtp : lastOtp
            })
            if(!isValid){
                // return {
                //     code : 401,
                //     message : 'Invalid otp'
                // }
                return createError.Unauthorized('Invalid otp')

            }
            if(isValid && email === lastOtp.email){
                const user = new User({
                    email,
                    userId : 1
                })
                const _user = await user.save()
                if(_user){
                    await Otp.deleteMany({
                        email
                    })
                }
                return{
                    code : 201,
                    elements : _user
                }
            }   
        } catch (error) {
            console.log(error)
        }
    },
    registerOTP : async ({email,password}) =>{
        try {
            const isExits = await User.findOne({
                email 
            })
            if(isExits){
                return createError.Conflict(`${email} is ready been registered`)
            }
    
            const user = new User({
                email,
                password
            })
    
            const savedUser = await user.save()
    
            //Classic
            // const num = Math.floor(Math.random()*(999999-100000)+100000)
            // const otp = num.toString()
    
            const OTP = OtpGenerator.generate(6,{
                digits: true,
                lowerCaseAlphabets: true,
                upperCaseAlphabets: true,
                specialChars: true,
            })
            // console.log('OTP',OTP)
    
    
            return {
                code : 200,
                // elements : savedUser
                elements : await insertOtp({
                    email,
                    otp : OTP
                })
            }
        } catch (error) {
            console.log(error)
        }
       
    },
    register : async ({email,password}) =>{
        try {
            const isExits = await User.findOne({
                email 
            })
            if(isExits){
                return createError.Conflict(`${email} is ready been registered`)
            }
    
            const user = new User({
                email,
                password
            })
    
            const savedUser = await user.save()
    
            //Classic
            // const num = Math.floor(Math.random()*(999999-100000)+100000)
            // const otp = num.toString()
    
            // const OTP = OtpGenerator.generate(6,{
            //     digits: true,
            //     lowerCaseAlphabets: true,
            //     upperCaseAlphabets: true,
            //     specialChars: true,
            // })
            // console.log('OTP',OTP)
    
    
            return {
                code : 200,
                elements : savedUser
                // elements : await insertOtp({
                //     email,
                //     otp : OTP
                // })
            }
        } catch (error) {
            console.log(error)
        }
       
    },
    Login : async ({email,password}) =>{
        try {
            const user = await User.findOne({email})
            if(!user){
                return createError.NotFound('User not registered')
            }
    
            const isValid = await user.isCheckPassword(password)
            // console.log('isValid',isValid)
            if(!isValid){
                return createError.Unauthorized()
            }
            const accessToken =await signAccessToken(user._id)
            const refreshToken =await signRefreshToken(user._id)
            return{
                accessToken,
                refreshToken
            }
        } catch (error) {
            console.log(error)
        }
    },
    RefreshToken : async ({refreshToken}) =>{
        try {
            if(!refreshToken) return createError.BadRequest()
    
            const {userId} = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
            return{
                accessToken,
                refToken
            }
        } catch (error) {
            console.log(error)
        }
     
    },
    LogOut : async ({refreshToken}) =>{
        try {
            if(!refreshToken){
                throw createError.BadRequest()
            }
            const {userId} = await verifyRefreshToken(refreshToken)
             
        } catch (error) {
            console.log(error)
        }
    }
}