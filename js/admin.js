import { Funko } from "./funkoClass.js";
let listaFunkopop = [];
const modalFunko = new bootstrap.Modal(document.getElementById('modalProducto'));

//funcion agergar funkopop (event){}
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    modalFunko.show();
})

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
// cerrar a ventana modal