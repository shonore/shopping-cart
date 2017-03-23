var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
new Product({
  imagePath: "http://placehold.it/350x350",
  title: "Item 1",
  description: "This is a good product",
  price: 10
  }),
new Product({
    imagePath: "http://placehold.it/350x350",
    title: "Item 2",
    description: "Buy me!",
    price: 15
    }),
new Product({
      imagePath: "http://placehold.it/350x350",
      title: "Item 3",
      description: "Add this item to your cart",
      price: 8
      }),
new Product({
        imagePath: "http://placehold.it/350x350",
        title: "Item 4",
        description: "This is what you've been looking for.",
        price: 17
        }),
new Product({
          imagePath: "http://placehold.it/350x350",
          title: "Item 5",
          description: "Get this item now!",
          price: 12
          })
];
var done = 0;
for(var i = 0; i < products.length;i++){
  //creates a new document with the save command
  products[i].save(function(err, result){
      done++;
      if(done == products.length){
        exit();
      }
  });
}
function exit(){
  mongoose.disconnect();
}
