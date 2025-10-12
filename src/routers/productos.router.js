import express from 'express'
import { listarProductos, crearProducto, eliminarProducto, buscarProductoId } from '../controllers/productos.controler.js'


const routerProduct = express.Router()

routerProduct.get('/', listarProductos)
routerProduct.get('/buscarProductoId/:codigo', buscarProductoId)
routerProduct.post('/', crearProducto)
routerProduct.delete('/:id', eliminarProducto)


export default routerProduct