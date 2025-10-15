document.addEventListener('DOMContentLoaded', () => {
    validarLogeo()
    menuUsuario()
})
//obtengo los datos del localstorage
const userDataJSON = localStorage.getItem('userData')

function validarLogeo() {


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


function menuUsuario() {

    //obtengo el campo del nombre del usuario en el html
    const userName = document.querySelector('.nombreUsuario')    
    const botonSubme = document.querySelector('.nombreUsuario')
   
    //parseo la informacon del localStorage
    const userData = JSON.parse(userDataJSON)
    
    //Seteo la informacion del username con la del localStorage

  if (userData.rol === "admin") {
        userName.innerHTML = userData.nombreCompleto + `
                <ul class="submenuUsuairo">
                        <li><a  href="añadir-usuario.html">Crear Usuario</a></li>                        
                        <li><a  href="vender-producto.html">Vender</a></li>       
                        <li><a class="cerrar-sesion" href="index.html">Cerrar Sesion</a></li>                        
                </ul>
       `
    }else{
          userName.innerHTML = userData.usuario + `
                <ul class="submenuUsuairo">    
                    <li><a href="vender-producto.html">Vender</a></li>                     
                    <li><a class="cerrar-sesion" href="">Cerrar Sesion</a></li>
                </ul>
       `
    }

     const subMenu = document.querySelector('.submenuUsuairo')
     const cerrar = document.querySelector('.cerrar-sesion')

    botonSubme.addEventListener('click', ()=>{
        subMenu.classList.toggle('submenuUsuairo-activo')
    })

    cerrar.addEventListener('click', ()=>{
        localStorage.removeItem('userData')
    })
}