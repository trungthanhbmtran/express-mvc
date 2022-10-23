'use strict'

const elasticClient = require('../databases/init.elasticsearch')

let that = module.exports={
    Search : async (req,res,next) =>{
        try {
            const {key,type} = req.query 
            const isSearch = await elasticClient.search({
                index: key
            })

            res.json({
                result : isSearch
            })
        } catch (error) {
            next(error)
        }
    },
    Create : async (req,res,next) =>{
        try {
            const {key,id,type,body} = req.body
            // console.log('req.body',req.body)
            const CreatedIndex = await elasticClient.indices.create({
                index: key,
                
            })
            // if(!CreatedIndex.acknowledged){
            //     res.json('loi index')
            // }
            const AddDataSearch = await elasticClient.create({
                index: key,
                id: id,
                body: body
            })

            res.json({
                result : AddDataSearch
            })
        } catch (error) {
            next(error)
        }
    },
    Delete : async (req,res,next) =>{
        try {
            const {key,type} = req.body
            console.log('req.body',req.body)
            const isSearch = await elasticClient.indices.delete({
                index: key
            })

            res.json({
                result : isSearch
            })
        } catch (error) {
            next(error)
        }
    }
}