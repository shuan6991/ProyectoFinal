import express from 'express'
import path from 'path'


export const iniciarServidor = (option)=>{

    const {port, publicPath='public'} = option

    const app = express()
    app.use(express.static(publicPath))
    app.get('/', (req, res)=>{
         const indexPath = path.join(__dirname + `../../../${publicPath}/index.html`)
         res.sendFile(indexPath)
    })

    app.listen(port, ()=>{
        console.log(`Servidor por el puerto ${port}`)
    })

}