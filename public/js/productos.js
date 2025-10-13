document.addEventListener('DOMContentLoaded', () => {
    datosProducto()
    obtenerProductos()
})

//creo la uel para los datos 
const urlProduct = "http://localhost:8000/products"

//creo la variable para el formualrio de productos
const formProducto = document.querySelector('.formInventario')

//creo funcion para validar los datos
async function validarDatosProducto(datos) {
    //creo control de errores
    try {

        //llamo el fetch api
        const reaultado = await fetch(urlProduct, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(datos)
        })

        //valido si el resultado fue exitoso 
        if (!reaultado.ok) {
            const errorDatos = await reaultado.json()
            throw new Error(errorDatos.message || `Error en la peticion http ${reaultado.status}`)
        }

        //si los datos estan correctos 
        await reaultado.json()
        //redirijo a la pagina de productos
        alert('El producto se creo correctamente')
        location.href = "http://localhost:8000/productos.html"


    } catch (error) {
        //si hay un error en la conexion envio mensaje de error
        console.log(error.message)
    }
}


//creo funcion para extraer los datos del formulario
function datosProducto() {
    //valido que el formulario exita en la pagina
    if (!formProducto) return

    //añado accion al formulario para escuchar cuando envien la informacion
    formProducto.addEventListener('submit', e => {
        //preven default para que no se actualice la pagina 
        e.preventDefault()
        //extraigo los datos del formulario
        const datosFomr = new FormData(formProducto)

        //convierto los datos a un objeto
        const datos = Object.fromEntries(datosFomr.entries())

        //envio los datos a la funcion validarDatosProductos
        validarDatosProducto(datos)
    })
}

//funcion para obtener datos
async function obtenerProductos() {

    //creo el fetch api para obtener productos 
    try {

        const productos = await fetch(urlProduct)
            .then(resultado => resultado.json())
            .catch(error => console.error(error.messages))

        //envio los productos a la funcion insertar productos
        insertarProduct(productos)

    } catch (error) {
        //envio mensaje de error si hubo un error en la conexion
        console.log(error.message)
    }
}

// funcion para insertar productos en el html
function insertarProduct(productos) {

    //llamo el tbody
    const inventarioBody = document.querySelector('.inventarioBody')

    //valido que el tbody exista en la pagina html, que la variable productos exsita y que tenga datos
    if (!inventarioBody || !productos || productos.length === 0) return

    //recorro el arreglo de productos
    productos.forEach(datos => {

        //creo el tr
        const tr = document.createElement('TR')

        //almaceno el codigo del tr
        tr.dataset.codigo = datos.codigo;

        //creo los td 
        const tdCodigo = document.createElement('TD')
        const tdNombre = document.createElement('TD')
        const tdCantidad = document.createElement('TD')
        const tdPrecio = document.createElement('TD')
        const tdAcciones = document.createElement('tdAcciones')

        //creo div para las img
        const divAcciones = document.createElement('DIV')

        //creo las img
        const actualizarImg = document.createElement('IMG')
        const eliminarImg = document.createElement('IMG')

        //asigno clases a las img
        actualizarImg.classList.add('acciones-img')
        eliminarImg.classList.add('acciones-img')

        //asigno class al div de las img
        divAcciones.classList.add('acciones-contenido')

        //creo link para las img
        const linkActualizar = document.createElement('A')
        const linkEliminar = document.createElement('A')


        //asigno direaccion a las img
        linkActualizar.href = '#'
        linkEliminar.href = '#'

        //le coloco la ruta a las img
        actualizarImg.src = "../img/editar.png"
        eliminarImg.src = "../img/eliminar.png"

        //asigno el te al tbody
        inventarioBody.appendChild(tr)

        //le asigno los dato del producto a los td
        tdCodigo.innerText = datos.codigo
        tdNombre.innerText = datos.nombreProducto
        tdCantidad.innerText = datos.cantidad
        tdPrecio.innerText = datos.precio

        //asigno los td al tr
        tr.appendChild(tdCodigo)
        tr.appendChild(tdNombre)
        tr.appendChild(tdCantidad)
        tr.appendChild(tdPrecio)
        tr.appendChild(tdAcciones)

        //asigno el div al td
        tdAcciones.appendChild(divAcciones)

        //asigno los links al div
        divAcciones.appendChild(linkActualizar)
        divAcciones.appendChild(linkEliminar)

        //Asigno las img al los links
        linkActualizar.appendChild(actualizarImg)
        linkEliminar.appendChild(eliminarImg)

        //Llamo la funcion para eliminar el producto seleccionado y envio el codigo del producto
        eliminarImg.onclick = () => eliminarProduto(datos.codigo)

    });
}

//Eliminar el producto
async function eliminarProduto(codigo) {
    //control de errores
    try {

        //fetch api para eliminar productos
        const deleteProducto = await fetch(`${urlProduct}/${codigo}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        //valido la respuesta 
        if (!deleteProducto.ok) {
            //mando mensaje de error
            const errorDelete = await deleteProducto.json()
            throw new Error(errorDelete.message || `Hubo un error en la conexion para eliminar el producto ${deleteProducto.status}`)
        }

        //llamo la funcion eliminar y elbio el codigo del producto
        eliminarFilaDeTabla(codigo)
        
        //envio el alert con mensaje de que se elimino el producto
        alert(`Se elimino producto con el codigo ${codigo} correctamente`)

    } catch (error) {
        //si no hay conexion envio error de conexion
        console.log(error.message)
    }
}

//creo funcion para elimnar fila de producto del html
function eliminarFilaDeTabla(codigo) {
    // byusco la fila que tiene el codigo
    const filaAEliminar = document.querySelector(`tr[data-codigo="${codigo}"]`);
    //elimino fila del html
    filaAEliminar.remove();
}

//creo funcion para actualizar producto
async function actualizarProducto() {
    try{

    }catch(error){

    }
}

//obtengo los datos del producto a actaulizar
function obtenerDatosProduc(){

}
