const express = require("express");
const router = express.Router();
const ProductsController = require("../controller/ProductsController")

// API Routing
router.get("/ProductsList/:pageNo/:perPage/:searchKeyword", ProductsController.ProductList)


module.exports = router;