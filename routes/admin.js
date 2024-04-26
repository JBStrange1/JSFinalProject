const express = require('express')
const {MongoClient, ObjectId} = require('mongodb')
const route = express.Router()

const {url} = process.env.MONGODB_URL || require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName) 
}

route.put('/menu/:id', async(request,response) => {
    const { body, params } = request
    const { id } = params
    const { name, description, price } = body
    
    const collection = await getCollection('WheelyGoodBBQ','menu')

    const menuItem = await collection.findOne({_id: new ObjectId(id)})
    const result = await collection.updateOne({_id: new ObjectId(id)}, { $set: { name, description, price} })
    response.json(result)
})

route.post('/menu', async (request,response)=>{
    const { body } = request
    const { name, description, price } = body
    const menuItem = { name, description, price }

    const collection = await getCollection('WheelyGoodBBQ','menu')
    const result = await collection.insertOne(menuItem)
    response.json(result)
})

route.delete('/menu/:id', async(request,response) => {
    const { id } = request.params
    const collection = await getCollection('WheelyGoodBBQ','menu')
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    response.json(result)
})

module.exports = route