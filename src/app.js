import express from 'express'
import bodyParser from 'body-parser'
import routerUser from './routers/usuarios.router.js'
import routerProduct from './routers/productos.router.js'
import { iniciarConection } from './conexion/conection.js'
// import { iniciarServidor } from './conexion/server.js'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { envs } from './config/env.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const { port } = envs

const app = express()

iniciarConection()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "../public")))



// app.use('/users', routerUser)
app.use('/products', routerProduct)
app.use('/users', routerUser)

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, `../../public/index.html`)
    res.sendFile(indexPath)
})

app.listen(port, () => {
    console.log(`El servidor esta escuchando por el puerto ${port}`)
})

// iniciarServidor(app)

export default app