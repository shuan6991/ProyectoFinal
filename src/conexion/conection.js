import mongoose from "mongoose";
import { envs } from "../config/env.js";


export const iniciarConection = async()=>{
    try{
        const {mongoUrl} = envs
       await mongoose.connect(mongoUrl)
       console.log('Conexion a la base de datos exitosa')
    }catch(error){
        console.log('No se pudo conectar a la base de datos'+error)
    }
}