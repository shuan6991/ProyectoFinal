import express from 'express'
import { listarProductos, crearProducto, eliminarProducto } from '../controllers/productos.controler.js'


const routerProduct = express.Router()

routerProduct.get('/', listarProductos)
routerProduct.post('/', crearProducto)
routerProduct.delete('/:id', eliminarProducto)


export default routerProduct