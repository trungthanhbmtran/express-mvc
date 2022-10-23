const {Client} = require('@elastic/elasticsearch')

const elasticClient= new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUD_ID
      },
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD
      }
})

// elasticClient.info()
//   .then(response => console.log(response))
//   .catch(error => console.error(error))


module.exports = elasticClient