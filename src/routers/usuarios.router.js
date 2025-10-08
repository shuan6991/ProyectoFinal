import express from 'express'
import { usuarios } from '../models/usuarios.js'


const routerUser = express.Router()

routerUser.get('/', async (req, res) => {
    try {
        const usuario = await usuarios.find()
        if (usuario.length === 0) {
            return res.status(404).json({
                message: 'No se encontro datos en la base de datos'
            })
        } else {
            return res.status(200).json(usuarios)
        }
    } catch (error) {
        res.status(500).json({
            message: message.error
        })
    }
})

routerUser.post('/', async (req, res) => {
    const { nombre, usuario, password } = req.body

    if (!nombre || !usuario || !password) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })
    } else {
        try {
            const usuario = new usuarios({
                nombre,
                usuario,
                password
            })

            const nuevoUsuario = await usuario.save()
            return res.status(201).json({
                message: 'El usuario ha sido creado correctamente',
                data: nuevoUsuario
            })

        } catch (error) {
            return res.status(500).json({
                message: message.error
            })
        }
    }
})


export default routerUser