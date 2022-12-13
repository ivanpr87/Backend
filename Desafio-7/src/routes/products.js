const { Router } = require('express')
const { ProductsController } = require('../controllers/product')
const { isAdmin } = require('../middlewares/checkAdmin')

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        let response = await ProductsController.getAll()
        res.json({ msg: response })
    } catch (err) {
        next(err)
    }

})

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let response = await ProductsController.getById(id)

        res.json({ msg: response });

    } catch (err) {
        next(err);
    }
});


router.post('/', isAdmin, async (req, res, next) => {
    try {

        const dato = req.body
        let response = await ProductsController.save(dato)

        res.json({ msg: `Nuevo producto guardado ID: ${response}` });

    } catch (err) {
        next(err);
    }
});


router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const body = req.body
    try {
        let data = await ProductsController.updateById(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});



router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await ProductsController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});

module.exports = router