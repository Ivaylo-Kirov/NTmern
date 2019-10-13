const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const itemsRoutes = require('./routes/api/items')

const PORT = process.env.port || 5000

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/items', itemsRoutes)

// db object hooked to MongoDB
const db = require('./config/dbinfo').mongoURI

mongoose.connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))