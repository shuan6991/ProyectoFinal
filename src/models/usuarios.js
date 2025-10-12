import mongoose from 'mongoose'
import bcrypt from "bcryptjs";


const usuariosSchema = new mongoose.Schema({
    nombreCompleto:{type:String, require: true},
    usuario:{type:String, require: true},
    password:{type:String, require:true}
})

//Middleware: antes de guardar, encriptar contraseña
usuariosSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export const usuarios = mongoose.model('users', usuariosSchema)