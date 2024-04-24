
// const {MongoClient, ObjectId} = require('mongodb')
// const {url} = process.env.MONGODB_URL || require('./secrets/mongodb.json')
// const client = new MongoClient(url)

// const getCollection = async (dbName, collectionName) => {
//     await client.connect()
//     return client.db(dbName).collection(collectionName) 
// }
// (async () => {
//     const collection1 = await getCollection('WheelyGoodBBQ','events')
//     const collection2 = await getCollection('WheelyGoodBBQ','menu')
//     const menus = await collection2.find().toArray()
//     const events = await collection1.find().toArray()
//     console.log(menus)
//     console.log(events)
// })()

const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const root = path.join(__dirname,'public')

app.use(express.json())
app.use('/api',require('./routes/public'))



const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))