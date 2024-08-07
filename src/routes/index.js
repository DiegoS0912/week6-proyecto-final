const express = require('express');
const routerCart = require('./cart.router');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerProductImg = require('./productImg.router');
const { verifyJwt } = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/cart', verifyJwt, routerCart)
router.use('/purchase', verifyJwt, routerPurchase)
router.use('/product_img', verifyJwt, routerProductImg)

module.exports = router;