import express from 'express'
import bodyParser from 'body-parser'
import usuarioRouter from './routers/usuarios.router.js'
import { iniciarConection } from './conexion/conection.js'
import { iniciarServidor } from './conexion/server.js'

const app = express()
app.use(bodyParser.json())

iniciarConection()

app.use('/users', usuarioRouter)

iniciarServidor(app)
