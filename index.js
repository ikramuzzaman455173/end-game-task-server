const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require("cors");


// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200,
// }

// middleware
app.use(cors())
app.use(express.json());




//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Key}@cluster0.u0hijab.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Key}@cluster0.wg8qvkk.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //  await client.connect();

        const collegeCollection = client.db("Job_Task_College_Boking").collection("colleges")
        const userCollection = client.db("Job_Task_College_Boking").collection("users")
        const reviewCollection = client.db("Job_Task_College_Boking").collection("reviews")


        app.get("/colleges", async (req, res) => {
            const result = await collegeCollection.find().toArray();
            res.send(result)
        })

        app.get('/college/:id', async (req, res) => {
            const collegeId = req.params.id;
            const query = { _id: new ObjectId(collegeId) }
            const result = await collegeCollection.findOne(query);
            res.send(result)
        })

        app.get("/reviews", async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUsers = await userCollection.findOne(query)
            if (existingUsers) {
                return res.send({ message: "user already exiists" })
            }
            const result = await userCollection.insertOne(user)
            res.send(result)//i
        })

        app.post("/review", async (req, res) => {
            const item = req.body
            const result = await reviewCollection.insertOne(item)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("running")
})

app.listen(port, () => {
    console.log(`running on port :${port}`)
})
