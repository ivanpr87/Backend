// este middleware de errores se encarga de atajar todos los errores que haya en nuestras rutas
// aca metemos la logica para ver que le respondemos al cliente (si un error generico o uno definido)

const checkErrors = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
}

module.exports = { checkErrors } 