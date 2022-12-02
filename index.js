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
  const allbyers = client.db("more").collection('byers');
  const allproducts = client.db("more").collection('products');

  app.get('/collections',async(req,res)=>{

    const query = {};
    const options = await serviceCollection.find(query).toArray();
    res.send(options);
  })
  app.get('/products',async(req,res)=>{

    const query = {};
    const options = await allproducts.find(query).toArray();
    res.send(options);
  })

  
  app.get('/byers',async(req,res)=>{

    const query = {};
    const options = await allbyers.find(query).toArray();
    res.send(options);
  })

  app.post('/collections', async(req, res)=>{
    const newservice = req.body;
    const result = await serviceCollection.insertOne(newservice);
    res.send(result);
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