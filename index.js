const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log(`Oh no, Mongo connection error: ${err}`)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App Listening on Port ${port}`);
})