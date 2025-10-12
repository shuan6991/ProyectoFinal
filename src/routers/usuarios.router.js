import express from 'express'
import { listarUsuarios, crearUsuario, login } from '../controllers/usuarios.controler.js'

const routerUser = express.Router()


routerUser.get('/', listarUsuarios)
routerUser.post('/', crearUsuario)
routerUser.post('/login', login)

export default routerUser 