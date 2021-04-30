import { Funko } from "./funkoClass.js";
let listaFunkopop = [];
const modalFunko = new bootstrap.Modal(
    document.getElementById('modalProducto')
);
//modificarFunko=true quiero modificar un funko existente
//modificarFunko=false quiero agregar un nuevo funko 
let modificarFunko = false;
//funcion agergar funkopop (event){}
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
        //mostrar ventana modal
        modalFunko.show();
    })
    // buscar los datos del local storage
leerDatos();

window.agregarFunkopop = function(event) {
    //el objetico de esta funcin es agegar un funkopop nuevo en local storage
    event.preventDefault();
    console.log("estamos dentro de la funcion funkopop")
        // traer los valores del formulario que ya estan validados

    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;

    let nuevoFunkopop = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen);
    // agregar el nuevo objeto en el arreglo de funkopop
    listaFunkopop.push(nuevoFunkopop);
    console.log(listaFunkopop);
    // guardar datos en localstorage
    localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
    limpiarFormulario();
    //mostrar un mensaje al usuario
    Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        ) //mostrar un mensaje al usuario
    Swal.fire(
            'Nuevo producto',
            'El Funkopop se agrego correctamente',
            'success'
        )
        //cerrar ventana modal 

    modalFunko.hide()
};
// limpiar el formulario
function limpiarFormulario() {
    //aquie estamos resteando lo svalores del formulario
    let formulario = document.getElementById("formFunkopop");
    formulario.reset();
}
// leer datos del local storage
function leerDatos() {
    if (localStorage.length > 0) {
        //traer datos del local storage
        let listaFunkopop_ls = JSON.parse(localStorage.getItem("listaFunkoKey"));

        if (listaFunkopop.length === 0) {
            listaFunkopop = listaFunkopop_ls;
        }
        // funcion dibujar los datos en una tabla
        dibujarTabla(listaFunkopop_ls);
    }
}

function dibujarTabla(listaFunkopop_ls) {
    // traer el tbody
    let tablaFunko = document.getElementById("tablaFunko");
    //variable para trabajar codigo html, donde voy a crear las filas 
    let filaFunko = "";
    //limpia los datos del tbody
    tablaFunko.innerHTML = "";
    //for (let i=0; i< listaFunkopop_ls.length; i++){}
    for (let i in listaFunkopop_ls) {
        // for in, hace solo el length sin escribirlo  
        // crear en al fila
        filaFunko = `<tr>
        <th>${listaFunkopop_ls[i].codigo}</th>
        <td>${listaFunkopop_ls[i].nombre}</td>
        <td>${listaFunkopop_ls[i].numSerie}</td>
        <td>${listaFunkopop_ls[i].categoria}</td>
        <td>${listaFunkopop_ls[i].descripcion}</td>
        <td>${listaFunkopop_ls[i].imagen}</td>
        <td>
            <button class=" btn btn-warning" onclick='preparDatosFunko(this)'id='${listaFunkopop_ls[i].codigo}'>Editar</button>
            <button class=" btn btn-danger" onclick ="eliminarFunkopop(this)" id="${listaFunkopop_ls[i].codigo}"
         >Borrar</button>
        </td>
    </tr>`
            //agregar la fila al elemento padre
        tablaFunko.innerHTML += filaFunko;
    }
}
window.eliminarFunkopop = function(boton) {
    console.log(boton.id);
    Swal.fire({
        title: 'Esta seguro de eliminar el funkopop?',
        text: "No puedes volver atras luego de este paso",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca va el codigo para eliminar el fubkopop, .Filter es para filtrar lo que hay dento del arreglo como por ej su codigo, nombre etc..
            let funkopopFiltrados = listaFunkopop.filter(function(producto) {
                    return producto.codigo != boton.id
                })
                //eso en forma de flecha seria //let funkopopFiltrados = listaFunkopop.filter(producto =>producto.codigo != boton.id)
            console.log(funkopopFiltrados);
            // igualar los arreglos
            listaFunkopop = funkopopFiltrados
                // guardar los datos en localstorage
            localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop))
                //llamar a la funcion leer datos
            leerDatos();

            Swal.fire(
                'eliminado',
                'no puedes volver atras luego de este paso.',
                'success'
            )
        }
    })
}
window.preparDatosFunko = function(boton) {
    console.log(boton.id)
    let funkoEncontrado = listaFunkopop.find(function(producto) {
        return producto.codigo === boton.id;
    })
    console.log(funkoEncontrado);
    document.getElementById('codigo').value = funkoEncontrado.codigo;
    document.getElementById('nombre').value = funkoEncontrado.nombre;
    document.getElementById('numSerie').value = funkoEncontrado.numSerie;
    document.getElementById('categoria').value = funkoEncontrado.categoria;
    document.getElementById('descripcion').value = funkoEncontrado.descripcion;
    document.getElementById('imagen').value = funkoEncontrado.imagen;
    modalFunko.show();

}