const express = require('express')
const {MongoClient, ObjectId} = require('mongodb')
const route = express.Router()

const {url} = process.env.MONGODB_URL || require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName) 
}

route.get('/menu', async (_,response)=>{
    const collection = await getCollection('WheelyGoodBBQ','menu')
    const items = await collection.find().toArray()
    response.json(items)
})

route.get('/events', async (_,response)=>{
    const collection = await getCollection('WheelyGoodBBQ','events')
    const events = await collection.find().toArray()
    response.json(events)
})

module.exports = route