
import { usuarios } from '../models/usuarios.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import { envs } from '../config/env.js';


const { jwtSecret } = envs

const generarToken = (usuario) => {

    return jwt.sign(
        { id: usuario._id, email: usuario.usuario },
        jwtSecret,
        { expiresIn: "1h" }
    );
};


//se crea funcion para optener los usuarios
export const listarUsuarios = async (req, res) => {

    try {

        //se busca si hay usuarios en la base de datos
        const usuario = await usuarios.find()

        //se valida que hallan usuarios en la base de datos
        if (usuario.length === 0)
            //si no hay se retorna mensaje de que no se encontraron datos
            return res.status(404).json({
                message: 'No se encontro usuarios en la base de datos'
            })

        //si se encuentran usuarios en la base de datos de retorna los usuarios
        return res.status(200).json(usuario)

    } catch (error) {
        //si hay un error en el servidor se retorna mensaje de error
        res.status(500).json({
            message: error.message
        })
    }
}


//se crea funcion para crear usuario
export const crearUsuario = async (req, res) => {

    //se extraen los datos que envia el usuario
    const { nombreCompleto, usuario, password, rol } = req.body

    // se valida que el usuario no exista en la base de datos
    const exist = await usuarios.findOne({ usuario })
    if (exist) return res.status(400).json({ message: `El usuario ya existe` })

    //Se valida que los campos no esten vacios
    if (!nombreCompleto || !usuario || !password || !rol)
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })

    try {

        //se crea un nuevo objeto
        const usuarioN = new usuarios({
            nombreCompleto,
            usuario,
            password,
            rol
        })

        //se crea eel usuario en la base de datos
        const nuevoUsuario = await usuarioN.save()
        return res.status(201).json({
            message: 'El usuario ha sido creado correctamente',
            data: nuevoUsuario
        })

    } catch (error) {

        //retornar si hubo un error en la base de datos
        return res.status(500).json({
            message: error.message
        })
    }

}


export const buscarIdUsuario = async (req, res) => {
    try {

        const nombreUsuario = req.params.usuario

        const buscarUsuario = await usuarios.findOne({usuario: nombreUsuario})

        if (!buscarUsuario)
            return res.status(404).json({
                message: 'usuario no encontrado'
            })

            return res.status(200).json(buscarUsuario)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//funcion para eliminar usuario

export const eliminarUsuario = async (req, res) => {
    try {
        const deleteUser = await usuarios.findByIdAndDelete(req.params.id)
        return res.status(204).json({
            message: 'usuarios eliminado correctamente',
            data: deleteUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


//Se crea login
export const login = async (req, res) => {
    try {

        //se extraen los datos que envia el usuario
        const { usuario, password } = req.body

        //se busca que el usuario exista
        const usuarioLogeo = await usuarios.findOne({ usuario })

        //se valida que el usuario exista
        if (!usuarioLogeo) return res.status(400).json({ message: 'Usuario no encontrado' })

        //se valida que la contraseña que envia el usuario coincida con la que esta en la base de datos
        const userValido = await bcrypt.compare(password, usuarioLogeo.password)
        if (!userValido) return res.status(401).json({ message: 'Contraseña incorrecta' })

        //se crea el token al usuario
        const token = generarToken(usuarioLogeo)
        //se envia mensaje de que todo salio bien
        return res.status(200).json({
            message: 'Inicio de sesion exitoso', token
        })

    } catch (error) {

        //se envia mensaje si hubo un error en el servidor
        return res.status(500).json({
            message: error.message
        })
    }
}


//se crea funcion para validar el token
export const validarToken = async (req, res) => {
    try {
        const autToken = await req.headers.authorization;
        if (!autToken) return res.status().json({
            message: 'El token es requerido'
        })

        const token = autToken.split(" ")[1];
        const decode = jwt.verify(token, jwtSecret)

        res.status(201).json({ message: 'token valido', usuarios: decode })

    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}