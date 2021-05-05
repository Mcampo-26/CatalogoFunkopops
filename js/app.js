// declaro las variables
let listaFunkok = [];
leerInformacion();

function leerInformacion() {
    // traer los datos del local storage
    if (localStorage.length > 0) {
        listaFunkok = JSON.parse(localStorage.getItem('listaFunkoKey'));
        // dibujar la columna con la card
        let grilla = document.getElementById('grillaFunko');
        // limpiar los datos del contenedor padre
        grilla.innerHTML = '';
        for (let i in listaFunkok) {
            let imagen = "";
            if (listaFunkok[i].imagen === '') {
                //quiero cargar imagen por defecto
                imagen = 'thanos.png';
            } else {
                imagen = listaFunkok[i].imagen;
            }
            let columna = `<div class="col-sm 12 col-md-3 d-flex justify-content-center mb-3">
            <div class="card" style=" width: 18rem;">
                <img src="/img/productos/${imagen}" class="card-img-top" alt="${listaFunkok[i].nombre}">
                <div class="card-body">
                    <h5 class="card-title">${listaFunkok[i].nombre}</h5>
                    <p class="card-text">${listaFunkok[i].descripcion}</p>
                    <a href="#" class="btn btn-primary">Vamos</a>
                </div>
            </div>
        </div>`;
            //agregar esa columna al index.html
            grilla.innerHTML += columna
        }
    }
}


// dibujar la columna con la card