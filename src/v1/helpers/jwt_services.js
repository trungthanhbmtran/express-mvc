const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../databases/init.redis')

const signAccessToken = async (userId) =>{
    return new Promise((resolve,reject)=>{
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn : '50s'
        }

        jwt.sign(payload,secret,options,(err,token)=>{
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req,res,next) =>{
    // console.log('req',req.headers.authorization)
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return next(createError.Unauthorized())
    }
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[2];
    // console.log('token',token)
    //start verify token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            // if(err.name === 'JsonWebTokenError'){
            //     return next(createError.Unauthorized())
            // }
                return next(createError.Unauthorized(err.message))
        }
        console.log('payload',payload)
        req.payload = payload
        next()
    })

}

const signRefreshToken = async (userId) =>{
    return new Promise((resolve,reject)=>{
        const payload = {
            userId
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn : '1y'
        }

        jwt.sign(payload,secret,options,(err,token)=>{
            if (err) reject(err)
            client.set(userId.toString(),token,'EX',365*24*60*60,(err,reply)=>{
                if(err) {
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    })
}

const verifyRefreshToken = (refreshToken) =>{
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
            if(err){
                return reject(err)
            }
            client.get(payload.userId,(err,replay)=>{
               if(err){
                return reject(createError.InternalServerError())
               } 
               console.log('refreshToken',refreshToken,replay)
               if(refreshToken === replay){
                return resolve(payload)
               }
               return reject(createError.Unauthorized())
            })
        })
    })
}


module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
}