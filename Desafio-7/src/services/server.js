const express = require('express')
const mainRouter = require('../routes/index')
const { checkErrors } = require('../middlewares/checkErrors')

/*Iniciamos api con express*/
const app = express()
/* permite leer lo que hay en el body segun el formato*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', checkErrors, mainRouter)


module.exports = app;