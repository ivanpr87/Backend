const { Router } = require('express')
const { CartController } = require('../controllers/cart');
const { ProductsController } = require('../controllers/product');
const { isAdmin } = require('../middlewares/checkAdmin')

const router = Router()

//POST: '/' - Crea un carrito y devuelve su id.
router.post('/', isAdmin, async (req, res, next) => {
    try {
        const dato = req.body
        let response = await CartController.saveCart(dato)

        res.json({ msg: `Nuevo carrito guardado ID: ${response}` });

    } catch (err) {
        next(err);
    }
});

//le paso solo el id en el body (id del producto cargado en products.json)
// POST: '/:id/products' - Para incorporar productos al carrito por su id de producto
router.post('/:id/products', isAdmin, async (req, res, next) => {
    try {
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);
        const cartSelected = await CartController.getCartById(cartId);
        const productToAdd = await ProductsController.getById(productId);
        await CartController.addProdInCart(cartSelected.id, productToAdd);
        return res.status(201).json({
            msg: "Producto agregado al carrito con éxito",
        });

    } catch (err) {
        next(err);
    }
});

// GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito

router.get('/:id/products', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const response = await CartController.getCartById(id)
        const data = await response
        res.json({ 'Productos del carrito': data.products });

    } catch (err) {
        next(err);
    }
});

//DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await CartController.deleteCartById(id)

        return res.status(200).json({
            msg: "Carrito eliminado con éxito",
        });

    } catch (err) {
        next(err)
    }

});

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/products/:id_prod', async (req, res, next) => {
    try {
        const cartId = parseInt(req.params.id);
        const prodId = parseInt(req.params.id_prod);
        //Esto solo sirve para saber si existe el carrito solicitado o no
        const cart = await CartController.getCartById(cartId);
        await CartController.deleteProduct(cartId, prodId);

        if (!cart) throw "El carrito no existe"

        return res.status(200).json({
            msg: "Producto eliminado del carrito con éxito",
        });

    } catch (err) {
        next(err)
    }

});


module.exports = router