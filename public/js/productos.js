let nombreProduct
let codig
let canti
let price

//creo la variable para el formualrio de productos
let formProducto
let formInventarioActua
let fromBuscar;

document.addEventListener('DOMContentLoaded', () => {
    //variables formulario para ver info producto en los campos
    nombreProduct = document.querySelector('#nombreProductoActu')
    codig = document.querySelector('#codigoActu')
    canti = document.querySelector('#cantidadActu')
    price = document.querySelector('#precioActu')

    formProducto = document.querySelector('.formInventario')

    formInventarioActua = document.querySelector('.formInventarioActua')
    fromBuscar = document.querySelector('.buscar')


    datosProducto()
    obtenerProductos()
    obtenerDatosProduc()
    // verInfoProducFomr()
    validarDatosFormBuscar()

})

//creo la uel para los datos 
const urlProduct = "http://localhost:8000/products";
const urlBuscar = "http://localhost:8000/products/buscarProductoCodigo"


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
        tr.classList.add('producto-linea')
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

        // linkActualizar.href = 'actualizar-producto.html'

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
        tr.appendChild(tdNombre)
        tr.appendChild(tdCodigo)
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

        //guardo los datos en localStorage para tomarlos en la pagina de actualizar producto
        actualizarImg.onclick = () => {
            crearModal()
            localStorage.setItem('productoEditar', JSON.stringify(datos))
        }
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

function crearModal() {

    const datosEditar = localStorage.getItem('productoEditar')
    const body = document.querySelector('body')
    const modal = document.createElement('DIV')

    modal.classList.add('modal')

    body.appendChild(modal)
    body.style.overflow = 'hidden'

    if (datosEditar) {
        const datos = JSON.parse(datosEditar)

        modal.innerHTML = ` 
            
          <div class="login-container" style="max-width:900px;">
            <h1 class="login-title">Formulario Producto</h1>
            <!-- Formulario de producto -->
            <form class="formInventarioActua" style="margin-bottom:24px;">
                <div class="input-group">
                    <i class="fa fa-box"></i>
                    <input type="text" id="nombreProductoActu" value='${datos.nombreProducto}' name="nombreProducto" placeholder="Nombre del producto" required>
                </div>
                <div class="input-group">
                    <i class="fa fa-barcode"></i>
                    <input type="text" id="codigoActu" value='${datos.codigo}' name="codigo" placeholder="Código Producto" required>
                </div>
                <div class="input-group">
                    <i class="fa fa-sort-numeric-up"></i>
                    <input type="number" id="cantidadActu" value='${datos.cantidad}' name="cantidad" placeholder="cantidad" min="1" required>
                </div>
                <div class="input-group">
                    <i class="fa fa-dollar-sign"></i>
                    <input type="number" id="precioActu" name="precio" value='${datos.precio}' placeholder="Precio" min="0" step="0.01" required>
                </div>
                <button type="submit">
                    <i class="fa fa-plus"></i> Actualizar producto
                </button>
            </form>
            <!-- Mensajes -->
            <div class="output-success" id="msgSuccess" style="display:none;"></div>
            <div class="output-error" id="msgError" style="display:none;"></div>
            <!-- Tabla de inventario -->
        </div>
        
        `


    }

    modal.onclick = ()=>{
        body.style.overflow='visible'
        modal.remove()
    }

}

// //creo funcion para ver los datos en los campos de actualiza producto
// function verInfoProducFomr() {

//     //tomo los datos del localStorage
//     const datosEditar = localStorage.getItem('productoEditar')


//     //verifico que tenga informacion
//     if (datosEditar) {

//         //parseo los datos 
//         const datos = JSON.parse(datosEditar)

//         //verifico que los campos existan en la pagina y seteo la informacion en el campo
//         if (nombreProduct) nombreProduct.value = datos.nombreProducto

//         //verifico que los campos existan en la pagina y seteo la informacion en el campo
//         if (codig) codig.value = datos.codigo

//         //verifico que los campos existan en la pagina y seteo la informacion en el campo
//         if (canti) canti.value = datos.cantidad

//         //verifico que los campos existan en la pagina y seteo la informacion en el campo
//         if (price) price.value = datos.precio

//     }

// }

//creo funcion para actualizar producto
async function actualizarProducto(datos) {
    //control de errres
    try {

        //creo mi fetch api 
        const actualizar = await fetch(`${urlProduct}/${datos.codigo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(datos)
        })

        //valido la repuesta 
        if (!actualizar.ok) {
            const errorActualizar = await actualizar.json()
            throw new Error(errorActualizar.message || `Hubo un error en la peticion HTTP ${actualizar.status}`)
        }

        //Si la respuesta es valida envio los datos
        await actualizar.json()
        //alerta de productos actualizados
        alert('el producto fue actualizado correctamente')

        //borro el item de localstorage
        localStorage.removeItem('productoEditar')

        //redigirmos a la pagina de productos
        location.href = 'http://localhost:8000/productos.html'

    } catch (error) {
        //Mensaje de error si hay un error en el server
        console.log(error.message)
    }
}

//obtengo los datos del producto a actaulizar
function obtenerDatosProduc() {
    //valido que el formulario exista
    if (!formInventarioActua) return

    //evento del formulario
    formInventarioActua.addEventListener('submit', e => {
        e.preventDefault()

        //tomo los datos del formulario
        const datosFromActua = new FormData(formInventarioActua)

        //parseo los datos a bject
        const datos = Object.fromEntries(datosFromActua.entries())

        //envio los datos a la funcion actualizar
        actualizarProducto(datos)

    })
}

//creo funcion para buscar producto
async function buscarProductoCodigo(datos) {
    try {
        //destruturo datos para obtener el codigo
        const { codigo } = datos

        //convierto el codigo todo en mayusculas por si viene en minusculas
        const codigoMayus = codigo.toUpperCase()

        //creo mi fetch api para buscar
        const resultado = await fetch(`${urlBuscar}/${codigoMayus}`)

        //valido la respuesta del resulatado
        if (!resultado.ok) {
            //creo el alert si la respuesta no esta bien  
            alert('El codigo del producto es incorrecto')
            return
        }

        //si la respuesta esta bien llamo la funcion visualizarUnProducto
        visualizarUnProducto(await resultado.json())

    } catch (error) {
        //si hay error en el server mando mensaje de error
        console.log(error.message)
    }
}

// validar datos del formulariobuscar producto por codigo
function validarDatosFormBuscar() {
    //validdo que el formulario  exista en la pagina
    if (!fromBuscar) return
    //creo evento del formulario
    fromBuscar.addEventListener('submit', e => {
        //quieto el prevent default
        e.preventDefault()

        //obtengo los datos 
        const datosForm = new FormData(fromBuscar)
        //parseo los datos 
        const datos = Object.fromEntries(datosForm.entries())
        //envio los datos a la funcion buscarProductoCodigo
        buscarProductoCodigo(datos)
    })

}

function visualizarUnProducto(resultado) {
    //llamo el tebody
    const productoLinea = document.querySelector('.inventarioBody')

    //seteo el body
    productoLinea.innerHTML = '';

    //se valida que exista el tebody y el resultado
    if (!productoLinea || !resultado) return

    //creo el tr
    const tr = document.createElement('TR')

    //almaceno el codigo del tr
    tr.dataset.codigo = resultado.codigo;
    tr.classList.add('producto-linea')
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
    linkActualizar.href = 'actualizar-producto.html'
    linkEliminar.href = '#'

    //le coloco la ruta a las img
    actualizarImg.src = "../img/editar.png"
    eliminarImg.src = "../img/eliminar.png"

    //asigno el te al tbody
    productoLinea.appendChild(tr)

    //le asigno los dato del producto a los td
    tdCodigo.innerText = resultado.codigo
    tdNombre.innerText = resultado.nombreProducto
    tdCantidad.innerText = resultado.cantidad
    tdPrecio.innerText = resultado.precio

    //asigno los td al tr
    tr.appendChild(tdNombre)
    tr.appendChild(tdCodigo)
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
    eliminarImg.onclick = () => eliminarProduto(resultado.codigo)

    //guardo los datos en localStorage para tomarlos en la pagina de actualizar producto
    actualizarImg.onclick = () => localStorage.setItem('productoEditar', JSON.stringify(resultado))

}