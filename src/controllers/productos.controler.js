
import { productos } from '../models/productos.js'



export const listarProductos =  async (req, res) => {
    try {
        const producto = await productos.find()
        if (producto.length === 0) {
            return res.status(404).json({
                message: 'No se encontro datos en la base de datos'
            })
        } else {
            return res.status(200).json(producto)
        }
    } catch (error) {
        res.status(500).json({
            message: message.error
        })
    }
}

export const crearProducto = async (req, res) => {
    const { nombreProducto,codigo,cantidad,precio  } = req.body

    if (!nombreProducto || !codigo || !cantidad || !precio) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })
    } else {
        try {
            const producto = new productos({
                nombreProducto,
                codigo,
                cantidad,
                precio
            })

            const nuevoProducto = await producto.save()
            return res.status(201).json({
                message: 'El producto ha sido creado correctamente',
                data: nuevoProducto
            })

        } catch (error) {
            return res.status(500).json({
                message: message.error
            })
        }
    }
}


