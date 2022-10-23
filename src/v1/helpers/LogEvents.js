const fs =require('fs').promises
const path = require('path')
const {format} = require('date-fns')

const filename = path.join(__dirname,'../logs','error.log');

const LogEvents = async (msg) =>{
    const datetime = `${format(new Date(),`dd-MM-yyyy\tss:mm:HH`)}`
    const ContentLog = `${datetime}---${msg}\n`
    try {
        fs.appendFile(filename,ContentLog)
    } catch (error) {
       console.log(err) 
    }
}

module.exports= LogEvents
