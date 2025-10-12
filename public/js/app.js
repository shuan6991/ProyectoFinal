document.addEventListener('DOMContentLoaded', () => {
    login()

})

// variables
const fomrLogin = document.querySelector('#loginForm')
const urlLogin = 'http://localhost:8000/users/login'

// Modo oscuro
document.getElementById('themeToggle').onclick = function () {
    document.body.classList.toggle('dark-mode');
    this.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fa fa-sun"></i>'
        : '<i class="fa fa-moon"></i>';
};


async function validarDatos(data) {
    try {

        //creo mi fetch api
        const respuesta = await fetch(urlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })

        //valido si la respuesta fue exitosa 
        if (!respuesta.ok) {
            const errorData = await respuesta.json()
            throw new Error(errorData.message || `Error http ${respuesta.status}`)
        }

        //repuesta exitosa
        const resultado = await respuesta.json()

        //Asigno el token a una variable
        const token = resultado.token

        //Valido el token
        if(token){
            //guardo el token en localstorage
            localStorage.setItem('authToken', token)
        }

        //Envio mensaje de inicio de sesion
        alert('inicio de sesion exitos Bienvenido')
        location.href= "http://localhost:8000/productos.html"

    } catch (error) {
        //error de conexion
        console.log('Error en el inicio de sesion')
    }
}


//funcion para optene datos del formulario
function login() {

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