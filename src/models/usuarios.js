import mongoose from 'mongoose'


const usuariosSchema = new mongoose.Schema({
    nombreCompleto:{type:String, require: true},
    usuario:{type:String, require: true},
    password:{type:String, require:true}
})


export const usuarios = mongoose.model('users', usuariosSchema)