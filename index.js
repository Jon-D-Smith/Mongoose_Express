//Express Setup
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//Mongo Database Setup
const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log(`Oh no, Mongo connection error: ${err}`)
    })

//Setup views path and ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

//Routing
app.get('/', (req, res) => {
    res.redirect('/products')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', { products })
})

//Routes to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)

})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product)
    res.render('products/show', { product })
})




//Listen for the server starting
app.listen(port, () => {
    console.log(`App Listening on Port ${port}`);
})