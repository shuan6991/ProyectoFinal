import express from 'express'
import { listarProductos, crearProducto } from '../controllers/productos.controler.js'


const routerProduct = express.Router()

routerProduct.get('/', listarProductos)
routerProduct.post('/', crearProducto)


export default routerProduct