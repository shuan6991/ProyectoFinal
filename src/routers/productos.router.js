import express from 'express'
import { listarProductos, crearProducto, eliminarProducto, buscarProductoCodigo, actualizaProducto } from '../controllers/productos.controler.js'


const routerProduct = express.Router()

routerProduct.get('/', listarProductos)
routerProduct.get('/buscarProductoCodigo/:codigo', buscarProductoCodigo)
routerProduct.post('/', crearProducto)
routerProduct.delete('/:codigo', eliminarProducto)
routerProduct.put('/:codigo', actualizaProducto)

export default routerProduct