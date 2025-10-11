import express from 'express'
import bodyParser from 'body-parser'
import routerUser from './routers/usuarios.router.js'
import routerProduct from './routers/productos.router.js'
import { iniciarConection } from './conexion/conection.js'
import { iniciarServidor } from './conexion/server.js'

const app = express()
app.use(bodyParser.json())

iniciarConection()

// app.use('/users', routerUser)
app.use('/products', routerProduct)
app.use('/users', routerUser)

iniciarServidor(app)
