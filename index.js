const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let productsData = require('./products.js');

app.use(express.static('static'));
let cors = require('cors');

app.use(cors());

function sortedProducts(name1, name2) {
  if (name1.name < name2.name) {
    return -1;
  } else if (name1.name > name2.name) {
    return 1;
  } else {
    return 0;
  }
}


app.get('/products', (req, res) => {
  res.json({products:productsData});
});

function sortByPopularity(rate1,rate2){
  return rate2.rating-rate1.rating;
}
app.get('/products/sort/popularity', (req, res) => {
  let sortedData = productsData.sort(sortByPopularity);
  res.json({products:sortedData});
});

app.get('/products/sorted-by-name', (req, res) => {
  let sortedProductsData = productsData.sort(sortedProducts);
  res.json({products:sortedProductsData});
});

function sortedByPriceAss(price1, price2) {
  return price1.price - price2.price;
}
function sortedByPriceDesc(price1, price2) {
  return price2.price - price1.price;
}

app.get('/products/sort/price-high-to-low', (req, res) => {
  let sortedData = productsData.sort(sortedByPriceDesc);
  res.json({products:sortedData});
});

app.get('/products/sort/price-low-to-high', (req, res) => {
  let sortedData = productsData.sort(sortedByPriceAss);
  res.json({products:sortedData});
});

function filterByRam(data, ram) {
  return data.ram === ram;
}

app.get('/products/filter/ram', (req, res) => {
  let givenRam = parseFloat(req.query.ram);
  let filterProducts = productsData.filter((ele) => filterByRam(ele, givenRam));
  res.json({products:filterProducts});
});

function filterByRom(data, rom) {
  return data.rom === rom;
}

app.get('/products/filter/rom', (req, res) => {
  let givenRom = parseFloat(req.query.rom);
  let filterProducts = productsData.filter((ele) => filterByRom(ele, givenRom));
  res.json({products:filterProducts});
});

function filterByBrand(data, brand) {
  return data.brand.toLowerCase() === brand.toLowerCase();
}
app.get('/products/filter/brand', (req, res) => {
  let givenBrand = req.query.brand;
  let filterProducts = productsData.filter((ele) =>
    filterByBrand(ele, givenBrand)
  );
  res.json({products:filterProducts});
});
function filterByOs(data, os) {
  return data.os.toLowerCase() === os.toLowerCase();
}
app.get('/products/filter/os', (req, res) => {
  let givenOs = req.query.os;
  let filterProducts = productsData.filter((ele) => filterByOs(ele, givenOs));
  res.json({products:filterProducts});
});


function filterByPrice(data,price){
  return data.price<=price;
}
app.get('/products/filter/price', (req, res) => {
  let givenPrice = parseFloat(req.query.price);
  let filterProducts = productsData.filter((ele) => filterByPrice(ele, givenPrice));
  res.json({products:filterProducts});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
