
import { productos } from '../models/productos.js'

//se crea funcion para listar los items de la api
export const listarProductos = async (req, res) => {
    try {
        //se buscan los productos de la api
        const producto = await productos.find()

        //Verificar si see encontraron los productos
        if (producto.length === 0)
            return res.status(404).json({
                message: 'No se encontro datos en la base de datos'
            })

        //si se encuentra el producto  retonar el producto
        return res.status(200).json(producto)

    } catch (error) {
        //si hay  un errror con el server devolver el error
        return res.status(500).json({
            message: error.message
        })
    }
}


//se crea funcion para crear productoo 
export const crearProducto = async (req, res) => {

    //se traen los datos utilizando desfragmentacion de objetos
    const { nombreProducto, codigo, cantidad, precio } = req.body

    //se valida que los datos que envio el usuario no estn vacios
    if (!nombreProducto || !codigo || !cantidad || !precio)

        //si estan vacios retorno error
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })

        // si no estan vacios 
    try {

        //se crea un opjeeto con la instacia de los datos que envio el usuaio
        const producto = new productos({
            nombreProducto,
            codigo,
            cantidad,
            precio
        })

        //y se guardan los datos creando asi el nuevo producto en este caso
        const nuevoProducto = await producto.save()
        // se retorna mensaje de que el producto fue creado
        return res.status(201).json({
            message: 'El producto ha sido creado correctamente',
            data: nuevoProducto
        })

    } catch (error) {
        //si hay un error con el servidor se retorna error 
        return res.status(500).json({
            message: error.message
        })
    }

}


export const buscarProductoId = async(req, res)=>{
    try{
        const codigoProducto = req.params.codigo

        const buscarProducto = await productos.findOne({codigo: codigoProducto})

        if(!buscarProducto)
            return res.status(404).json({
                message: 'El producto no se encontro en la base de datos'

        })        
        return res.status(200).json(buscarProducto)
        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//se crea funcion para actualiza producto
export const actualizaProducto = async(req, res)=>{

    try{

        //se actualiza el producto
        const updateProducto = await productos.findByIdAndUpdate(req.params.id, req.body, {new:true})

        //mensaje del que el produto fue actualizado
        return res.status(200).json({
            message: `El producto se actualizo correctamente`,
            data: updateProducto
        })

    }catch(error){

        //si hubo un error en el servidor mensaje de error 
        return res.status(500).json({
            message: error.message
        })
    }
}

//se crea funcion para eliminar el producto
export const eliminarProducto = async(req, res)=>{
    try{

        //se elimina el producto
        const deleteProducto = await productos.findByIdAndDelete(req.params.id)

        //se retorna mensaje de producto eliminado
        return res.status(204).json({
            message: 'El producto fue eliminado',
            data: deleteProducto
        })
    }catch(error){

        //si hay un error en el servidor se coloca mensaje de error
        return res.status(500).json({
            message: error.message
        })
    }
}
