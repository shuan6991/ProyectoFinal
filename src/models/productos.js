import mongoose from "mongoose";


const productosSchema = new mongoose.Schema({
    nombreProducto: {type:String, required:true},
    codigo: {type:String, required: true},
    cantidad:{type:Number, required:true},
    precio:{type:Number, required:true}
})


export const productos = mongoose.model('products', productosSchema)