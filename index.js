const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.dbuser}:${process.env.dbPass}@cluster0.izhktyr.mongodb.net/?retryWrites=true&w=majority`;


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
      await client.connect();
      const usersCollection = client.db('summerCampSchool').collection('users')
      app.get('/users', async (req, res) => {
        const users = await usersCollection.find({}).toArray()
        res.send(users)
      })

      // database users data hanlde api
      app.get('/allUsers', async (req, res) => {
        const users = await usersCollection.find({}).toArray()
        res.send(users)
      })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('<h1 style="color:#333;text-align:center;font-size:20px;margin:10px 0;">Summer Camp School Server Is Running !!!</h1>')
})

app.listen(port, () => {
    console.log(`End Game Task Server Is Running On Port:http://localhost:${port}`);
})
