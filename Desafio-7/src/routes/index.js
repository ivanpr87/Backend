const { Router } = require('express')
const routerProductos = require('./products')
const routerCart = require('./cart')

const router = Router()

router.use('/products', routerProductos)
router.use('/cart', routerCart)

module.exports = router;