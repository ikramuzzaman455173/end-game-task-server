const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Key}@cluster0.wg8qvkk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    // await client.connect();

    const collegeCollection = client.db('Job_Task_College_Boking').collection('colleges');
    const userCollection = client.db('Job_Task_College_Boking').collection('users');
    const reviewCollection = client.db('Job_Task_College_Boking').collection('reviews');

    app.get('/colleges', async (req, res) => {
      try {
        const result = await collegeCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Other routes...

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




    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.get('/', (req, res) => {
  res.send('running');
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});