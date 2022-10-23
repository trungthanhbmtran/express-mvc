const mongoose = require('mongoose')


const newConnection= (uri) =>{
    const conn = mongoose.createConnection(uri,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    conn.on('connected',function (){
        console.log(`mongodb connected:: ${this.name}`)
    })
    
    conn.on('disconnected',function(){
        console.log(`mongodb disconnected ${this.name}`)
    })
    
    conn.on('error', (error)=>{
        console.log(`mongodb error ${JSON.stringify(error)}`)
    })
    
   
    return conn
}

//make connection to db test

const TestConnection = newConnection(process.env.MONGO_URI_TEST)
const UserConnection = newConnection(process.env.MONGO_URI_USER)


module.exports = {
    TestConnection,
    UserConnection
}