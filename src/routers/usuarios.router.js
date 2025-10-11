import express from 'express'
import { listarUsuarios, crearUsuario } from '../controllers/usuarios.controler.js'

const routerUser = express.Router()


routerUser.get('/', listarUsuarios)
routerUser.post('/', crearUsuario)


export default routerUser 