
const listapelicula = document.getElementById('lista-peliculas');

eventos();

function eventos(){
    document.getElementById('formulario').addEventListener('submit', agregarp)

    listapelicula.addEventListener('click', borrarp);

    document.addEventListener('DOMContentLoaded', cargarp);
}


// agregar pelicula
function agregarp(p){
    p.preventDefault();

    // obtener lo que se escriba en el text area
    const peliculas = document.getElementById('Peliculas').value;
    // listado de peliculas agregadas (en el html)
        // crear un elemento nuevo (li) para listar
    const listado = document.createElement('li');   
    listado.innerHTML=peliculas;
    listapelicula.appendChild(listado);

    // crear boton borrar
    const borrar = document.createElement('a');
    borrar.classList='borrar-pelicula';
    borrar.innerText='X';

    listado.appendChild(borrar);

    agregandop(peliculas);
}


// borrar pelicula
function borrarp(p){
    p.preventDefault();

    // verificar si se da click en la 'x'
    if(p.target.className === 'borrar-pelicula'){
        console.log(p.target.parentElement.remove());

        alert('Pelicula borrada');

        borrarpl(p.target.parentElement.innerText);
    }
}


// agregar peliculas al localStorage
function agregandop(peliculas){
    let pelicula;

    pelicula = obteniendop();
    pelicula.push(peliculas);
    
    localStorage.setItem('peliculas', JSON.stringify(pelicula));
}


function obteniendop(){
    let pelicula;

    if(localStorage.getItem('peliculas') === null){
        pelicula = [];
    }
    else{
        pelicula = JSON.parse(localStorage.getItem('peliculas'));
    }

    return pelicula;
}


// que no desaparescan las peliculas al recargar la pagina
function cargarp(){
    let pelicula;

    pelicula = obteniendop();

    // al recargar la pagina se vuelve a llamar la lista con las peliculas y las muestra en la pagina
    pelicula.forEach(function(peliculas){
        const listado = document.createElement('li');   
        listado.innerHTML=peliculas;
        listapelicula.appendChild(listado);
    
        // crear boton borrar
        const borrar = document.createElement('a');
        borrar.classList='borrar-pelicula';
        borrar.innerText='X';
    
        listado.appendChild(borrar);
    });
}


// borrar la pelicula en el DOM y en localStorage
function borrarpl(peliculas){
    let pelicula, borrarpl;

    borrarpl = peliculas.substring(0, peliculas.length-1);
    pelicula = obteniendop();

    pelicula.forEach(function(peliculas, index){
        if(borrarpl === peliculas){
            pelicula.splice(index, 1);

        }

    });

    // convertir el JSON a un string
    localStorage.setItem('peliculas', JSON.stringify(pelicula));
}







