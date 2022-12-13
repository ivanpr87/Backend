const { Router } = require('express')
const { ProductsController } = require('../controllers/contenedor')

const router = Router();

router.get('/', (req, res) => {
    res.render('index'); // Se muestra la plantilla index.pug -->Formulario
});

router.get('/productos', async (req, res, next) => {
    try {
        const obj = await ProductsController.getAll()
        res.render('productos', {
            productos: obj,
            message: 'Productos cargados'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/productos', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        await ProductsController.save({ title, price, thumbnail })
        res.redirect('/productos');

    } else {
        res.send('Faltan datos');
    }

})

module.exports = router