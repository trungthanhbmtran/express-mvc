const express = require('express');
const router = express.Router();
// routes.use('/user',require('./user')),
// routes.use('/order',require('./order'))
const {verifyAccessToken} =require('../helpers/jwt_services')
const UserController = require('../Controllers/User.controller');
// const elasticsearchController = require('../Controllers/elasticsearch.controlle');


router.post('/register',UserController.register)


router.post('/refresh-token',UserController.refreshToken)

router.post('/login',UserController.login)

router.delete('/logout',UserController.logout)

router.get('/getlist',verifyAccessToken,UserController.getlist)

router.post('/verifyOtp',UserController.verifyOtp)

// router.post('/create-post',elasticsearchController.Create)



// routes.get('/checkstatus',(req,res,next)=>{
//   res.status(200).json({
//     status : 'success',
//     message : 'api ok'
//   })
// })

// //redis controller test
// const {
//   setPromise,
//   getPromise
// } = require('../controllers/redis.controller');
// const pool = require('../database/init.mysql');

// routes.put('/v1/user',setPromise)
// routes.post('/v1/users',getPromise)

// pool.execute('query',(err,records,fields)=>{
//   if(err) throw new err
// })


// routes.use('/payment',require('./v2/order.routes'))

module.exports = router