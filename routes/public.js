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

route.post('/menu'), async ( request , response) => {
    const { body } = request
    const { name, description, price } = body
    const item = { name, description, price }
    const collection = await getCollection('WheelyGoodBBQ', 'menu')
    const result = await collection.insertOne(item)
    response.json(result)
}
route.put('/menu/:id'), async ( request , response) => {
    const { body, params } = request
    const { id } = params
    const { name, description, price } = body
    const item = { name, description, price }
    const collection = await getCollection('WheelyGoodBBQ', 'menu')
    const result = await collection.updateOne( { _id: new ObjectId(id) }, {$set: item})
    response.json(result)
}
route.delete('/menu/:id'), async (request, response)  => {
    const { id } = request.params
    const collection = await getCollection('WheelyGoodBBQ', 'menu')
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    response.json(result)
}

route.get('/events', async (_,response)=>{
    const collection = await getCollection('WheelyGoodBBQ','events')
    const events = await collection.find().toArray()
    response.json(events)
})


route.get('/events/:id', async (request,response)=>{
    const {id} = request.params
    const collection = await getCollection('WheelyGoodBBQ','events')
    const event = await collection.findOne({_id:new ObjectId(id)})
    response.json(event)
})

route.post('/events'), async ( request , response) => {
    const { body } = request
    const { name, location, dates, hours } = body
    const event = { name, location, dates, hours }
    const collection = await getCollection('WheelyGoodBBQ', 'menu')
    const result = await collection.insertOne(event)
    response.json(result)
}

module.exports = route