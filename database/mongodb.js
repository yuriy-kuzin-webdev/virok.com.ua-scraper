const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://virok:virok@cluster0.2z17wno.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)
const database = client.db("warehouse")
const collection = database.collection("goods")

const getResolver = () => {
    return async (data) => {
        const goods = collection
        return collection.insertOne({
            _id:data.article,
            imageUrl: data.imageUrl,
            description: data.description,
            category: data.category,
            type: data.type
        })
    }
}

module.exports = getResolver()