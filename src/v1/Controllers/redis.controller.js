'use strict'
const {
    setPromise,
    getPromise,
    delPromise
} = require('../Services/redis.service')

let that = module.exports ={
    setPromise: async(req,res,next)=>{
        try {
            const {
                key,
                payload
            } = req.body
            return res.json({
                data : await setPromise({
                    key,
                    value : JSON.stringify(payload)
                })
            })
        } catch (error) {
            next(error)
        }
    },
    getPromise : async(req,res,next)=>{
        try {
            const {
                key
            } = req.body
            return res.json({
                data : JSON.parse(await getPromise(key))
            })
        } catch (error) {
            next(err)
        }
    },
    delPromise : async (req,res,next)=>{
        try {
            const {
                key
            } = req.body
            return res.json({
                data : JSON.parse(await delPromise(key))
            })
        } catch (error) {
            next(error)
        }
    }
    
}