import mongoose from 'mongoose'
import bcrypt from "bcryptjs";


const usuariosSchema = new mongoose.Schema({
    nombreCompleto:{type:String, required: true},
    usuario:{type:String, required: true},
    password:{type:String, required:true},
    rol:{type:String, required: true}
})

//Middleware: antes de guardar, encriptar contraseña
usuariosSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export const usuarios = mongoose.model('users', usuariosSchema)