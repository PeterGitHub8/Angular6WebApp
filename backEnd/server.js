import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Product from './models/Product';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/productList', { useNewUrlParser: true });

// var mongojs = require('mongojs');
// var db = 'mongodb://localhost:27017/productList';

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb database connection established successfuly!');
});


//Get all products from the database
router.route('/products').get((req, res) => {
  Product.find((err, products) => {
    if (err){
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

//Get one product from the database
router.route('/product/:id').get((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err){
      console.log(err);
    }
    else {
      res.json(product);
    }
  });
});

//Add a product to the database
router.route('/products/add').post((req, res) => {
  let product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json({'product': 'Added successfuly'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

//Updating a product
router.route('/products/update/:id').post((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if(!product){
      return next(new Error('Could not load document'));
    }
    else {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.stock = req.body.stock;

      product.save().then(product => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

//Deleteing a Product
router.route('/products/delete/:id').get((req, res) => {
  Product.findByIdAndRemove({_id: req.params.id}, (err, product) => {
    if(err){
      res.json(err);
    }
    else {
      res.json('Product has successfuly been removed');
    }
  });
});

app.use('/', router);

app.listen(4000, () => console.log('Express Server is running on port 4000'));
