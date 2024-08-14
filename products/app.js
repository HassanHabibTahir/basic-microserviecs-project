// index.js
const express = require("express");
const app = express();

app.use(express.json());

// Sample in-memory product data
let products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

// Create a new product
app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.status(201).json(product);
});

// Update a product by ID
app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

// Delete a product by ID
app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.status(204).send();
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Product service started on port ${PORT}`));
