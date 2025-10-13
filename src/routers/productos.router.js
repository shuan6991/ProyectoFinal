import express from 'express'
import { listarProductos, crearProducto, eliminarProducto, buscarProductoId, actualizaProducto } from '../controllers/productos.controler.js'


const routerProduct = express.Router()

routerProduct.get('/', listarProductos)
routerProduct.get('/buscarProductoId/:codigo', buscarProductoId)
routerProduct.post('/', crearProducto)
routerProduct.delete('/:codigo', eliminarProducto)
routerProduct.put('/:codigo', actualizaProducto)

export default routerProduct