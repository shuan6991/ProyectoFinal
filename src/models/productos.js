import mongoose from "mongoose";


const productosSchema = new mongoose.Schema({
    nombreProducto: {type:String, require:true},
    descripcion: {type:String, require: true},
    cantidad:{type:Number, require:true},
    precio:{type:Number, require:true}
})


export const productos = mongoose.modelo('products', productosSchema)