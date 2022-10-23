'use strict';

const OtpModel = require("../Models/Otp.model");
const bycryt = require('bcrypt');

const _Otp = require('../Models/Otp.model')

let that = module.exports ={
    insertOtp : async ({otp,email}) =>{
        try {
            const salt = await bycryt.genSalt(10)
            const hasOtp = await bycryt.hash(otp,salt);
            const Otp = await _Otp.create({
                email,
                Otp : hasOtp
            })
            return Otp ? 1 : 0
        } catch (error) {
            console.log(error)
        }
    },
    validotp : async ({
         otp
        ,hashOtp
    })=>{
        try {
           const isValid = await bycryt.compare(otp,hashOtp) 
           return isValid
        } catch (error) {
            
        }
    }
}