//Express Setup
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const methodOverride = require('method-override')


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
app.use(methodOverride('_method'))

//Routing
app.get('/', (req, res) => {
    res.redirect('/products')
})

const categories = ['fruit', 'vegetable', 'dairy'];
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', { products })
})

//Routes to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)

})




//Routes to edit a product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)

})

//Product detail page
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