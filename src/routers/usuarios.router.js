import express from 'express'
import { listarUsuarios, crearUsuario, login, buscarIdUsuario, eliminarUsuario } from '../controllers/usuarios.controler.js'

const routerUser = express.Router()


routerUser.get('/', listarUsuarios)
routerUser.get('/buscarIdUsuario/:usuario', buscarIdUsuario)
routerUser.post('/', crearUsuario)
routerUser.post('/login', login)
routerUser.delete('/:id', eliminarUsuario)

export default routerUser 