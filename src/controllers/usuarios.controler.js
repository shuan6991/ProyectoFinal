
import { usuarios } from '../models/usuarios.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const listarUsuarios = async (req, res) => {
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
}

export const crearUsuario = async (req, res) => {
    const { nombreCompleto, usuario, password } = req.body

    if (!nombreCompleto || !usuario || !password) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })
    } else {
        try {
            const usuario = new usuarios({
                nombreCompleto,
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
}


