const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();



// Middlewire
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8spglx.mongodb.net/?retryWrites=true&w=majority`;
console.log(`${process.env.DB_USER}`)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

try{

  const serviceCollection = client.db("more").collection('collections');

  app.get('/collections',async(req,res)=>{

    const query = {};
    const options = await serviceCollection.find(query).toArray();
    res.send(options);
  })

}
finally{

}

}
run().catch(console.log)

app.get('/', async(req,res)=>{
    res.send('More server runing')
})

app.listen(port, ()=>console.log(`More server runing${port}`))