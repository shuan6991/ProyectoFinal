import mongoose from "mongoose";
import { config } from "dotenv";

config()

export const iniciarConection = async()=>{
    try{
        
       await mongoose.connect(process.env.MONGO_URL)
       console.log('Conexion a la base de datos exitosa')
    }catch(error){
        console.log('No se pudo conectar a la base de datos'+error)
    }
}