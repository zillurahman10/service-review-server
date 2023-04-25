const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//user: zillurhero40
//password: fbsQtFTCDQAmLVxg

app.get('/', (req, res) => {
    res.send('Welcome zillur-youtuber server')
})



const uri = "mongodb+srv://zillurhero40:fbsQtFTCDQAmLVxg@cluster0.ka1x2pa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

async function run() {
    try {
        const serviceCollection = client.db('Zillur-Youtuber').collection('services');
        const reviewsCollection = client.db('Zillur-Youtuber').collection('reviews')

        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await serviceCollection.findOne(query)
            res.send(result)
        })

        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({})
            const reviews = await cursor.toArray()
            res.send(reviews)
        })

        app.post('/reviews', async (req, res) => {
            const review = req.body
            const result = await reviewsCollection.insertOne(review)
            console.log(result);
            review._id = result.insertedId
            res.send(result)
        })

        app.get('/review', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const review = await reviewsCollection.findOne(query).toArray()
            res.send(review)
        })

        app.post('/services', async (req, res) => {
            const review = req.body
            const result = await serviceCollection.insertOne(review)
            console.log(result);
            review._id = result.insertedId
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir);


app.listen(port, (req, res) => {
    console.log(`Server listening port on ${port}`);
})