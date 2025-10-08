import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import { envs } from '../config/env.js'


export const iniciarServidor = (app) =>{

    const {port, publicPath} = envs

    app.use(express.static(publicPath))

    app.get('/', (req , res)=>{
        const indexPath = path.join(__dirname + `../../${publicPath}/login.html`)
        res.sendFile(indexPath)
    })


    app.listen(port, ()=>{
        console.log(`El servidor esta escuchando por el puerto ${port}`)
    })
}