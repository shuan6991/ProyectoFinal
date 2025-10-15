document.addEventListener('DOMContentLoaded', () => {
    login()
    validarDatosUsu()
    setupPersistentDarkMode()
})

// variables
const fomrLogin = document.querySelector('#loginForm')

const formUsuario = document.querySelector('.formUsuario')

const urlLogin = 'http://localhost:8000/users/login'
const urlUsuario = 'http://localhost:8000/users'

// Modo oscuro
function setupPersistentDarkMode() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const darkModeKey = 'darkModeEnabled';

        const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fa fa-moon"></i>';
        }
    };

    const storedPreference = localStorage.getItem(darkModeKey);
    if (storedPreference !== null) {
        applyTheme(storedPreference === 'true');
    }

    themeToggle.onclick = function () {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        applyTheme(isDarkMode);
        
        localStorage.setItem(darkModeKey, isDarkMode);
    };
}


async function validarDatos(data) {
    try {

        //creo mi fetch api
        const respuesta = await fetch(urlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        //valido si la respuesta fue exitosa 
        if (!respuesta.ok) {
            alert('Datos incorrectos')
        }

        //repuesta exitosa
        const resultado = await respuesta.json()

        //Asigno el token a una variable
        const { token, usuarioLogeo } = resultado



        //Valido el token
        if (token && usuarioLogeo) {

            //Borro la contraseña para que no se guarde en mi localStorage
            if (usuarioLogeo.password) {
                delete usuarioLogeo.password
            }

            //guardo el token en localstorage
            localStorage.setItem('authToken', token)
            //guardo el usuario en el localstorage
            localStorage.setItem('userData', JSON.stringify(usuarioLogeo))

            //Envio mensaje de inicio de sesion
            alert('inicio de sesion exitos Bienvenido ' + usuarioLogeo.nombreCompleto)
            location.href = "http://localhost:8000/productos.html"

        } else {
            throw new Error('Respuesta del servdor invalida')
        }
    } catch (error) {
        //error de conexion
        console.log('Error en el inicio de sesion')
    }
}

//funcion para optene datos del formulario
function login() {
    if(!fomrLogin) return
    //evento del formulario
    fomrLogin.addEventListener('submit', e => {
        e.preventDefault()

        //extraigo los datos del formulario
        const datoslogin = new FormData(fomrLogin)

        //convierto los datos a json
        const data = Object.fromEntries(datoslogin.entries())

        //Envio los datos a la funcion validar datos
        validarDatos(data)
    })
}

function validarLogeo() {
    //obtengo los datos del localstorage
    const userDataJSON = localStorage.getItem('userData')


    //valido que  exista la funcion userData en el local storage
    if (!userDataJSON) {
        console.log('no hay datos de usuarioi')
        //si no  existe redirijo a la pagina de logeo
        location.href = 'http://localhost:8000/index.html'

        return;
    }

    //si existe realizo control de errores
    try {
        //parseo los datos 
        const userData = JSON.parse(userDataJSON)
        //valido que hayan datos y que los datos esten correctos
        if (!userData || !userData.usuario) {
            console.log("Los datos del usuario estan corructos o incompletos")
            //si no hay datos o no son correctos elimino el userData del localStorage
            localStorage.removeItem("userData")

            //se redirige a la pagina principal
            location.href = 'http://localhost:8000/index.html'

            return;
        }

        //mensaje de que el usuario si esta autenticado
        console.log('usuario autenticado')

    } catch (error) {
        //error de parseo de datos
        console.log('Error al parsear los datos del usuario ' + error.message)
        //se eliminda el userData del localStorage
        localStorage.removeItem("userData");
        //se redirige a la pagina principal
        location.href = 'http://localhost:8000/index.html';

    }
}


async function crarUsuario(datos) {
    try {
        const resultado = await fetch(urlUsuario, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        })

        if (!resultado.ok) {
            const errrorResultado = await resultado.json()
            throw new Error(errrorResultado.message || `Hubo un error en la peticion HTTP ${resultado.status}`)
        }

        await resultado.json()
        alert('El usuario se creo corectamente')
        location.href = 'http://localhost:8000/productos.html'
    } catch (error) {
        console.log(error.message)
    }
}

function validarDatosUsu() {
    if (!formUsuario) return

    formUsuario.addEventListener('submit', e => {
        e.preventDefault()

        const usuarioDatos = new FormData(formUsuario)

        const datos = Object.fromEntries(usuarioDatos.entries())

        crarUsuario(datos)
    })
}