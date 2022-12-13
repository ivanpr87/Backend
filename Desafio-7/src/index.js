const server = require('./services/server')
const { port } = require('./config/index')

server.listen(port, () => {
    console.log(`Escuchando Servidor en puerto ${port}`)
})