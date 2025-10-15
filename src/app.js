import express from 'express'
import bodyParser from 'body-parser'
import routerUser from './routers/usuarios.router.js'
import routerProduct from './routers/productos.router.js'
import { iniciarConection } from './conexion/conection.js'
import { envs } from './config/env.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
// import { iniciarServidor } from './conexion/server.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
iniciarConection()




app.use(cors());
const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + `../${envs.publicPath}`)))



// app.use('/users', routerUser)
app.use('/products', routerProduct)
app.use('/users', routerUser)

 app.get('/', (req , res)=>{
        const indexPath = path.join(__dirname + `../../${publicPath}/index.html`)
        res.sendFile(indexPath)
})

    export default app
