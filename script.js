class Song {

    songs = [];
    constructor() {
    }

    setItemLi(musica, contenido, i) {
        let musica_actual = document.createElement("li");
        musica_actual.innerHTML =
            `<div class="titulo_grupo far fa-play-circle">
        <p>${i}.</p>
        <a class="group-name" title="Ir al Grupo" href="${musica.artist.url}">${musica.artist.name}</a>
        <a class="song-title">${musica.name}</a>
        </div> 
        <div class="listeners">${musica.listeners} listeners</div>`;

        contenido.appendChild(musica_actual);
    }

    setItemGroupName(group, url) {
    }
    setItemSongTitle(title) {
    }
    setListeners(listeners) {
    }
    getNewElement(group, url, title, listeners) {

    }

}


const loadSongs = (lista) => {

    let contenido1 = document.getElementsByClassName("contenido1")[0];
    contenido1.innerHTML = "";
    let musica = new Song();
    for (let i = 0; i < lista.length; i++) {
        musica.setItemLi(lista[i], contenido1, i + 1);
    }
}
const loadOverview = (array_de_canciones) => {

    return array_de_canciones;
}

const loadTenListened = (array_de_canciones) => {

    array_de_canciones = array_de_canciones.sort((x, y) => y.listeners - x.listeners);
    array_de_canciones = array_de_canciones.slice(0, 10);
    return array_de_canciones;
}

const loadBiggest = (musicas) => {

let bandas = musicas.map((bandas)=>bandas.artist.name); 
let filtrado = bandas.filter(filtro);

let listeners_totales = [];
for (let i = 0; i < filtrado.length; i++) {
    listeners_totales[i] = 0;
} 

for (let j = 0; j < filtrado.length; j++) {
    for (let i = 0; i < musicas.length; i++) {
        if (filtrado[j] == musicas[i].artist.name){
            listeners_totales[j] += parseInt(musicas[i].listeners);
        }
    }
}

let objeto = [];
for (let i = 0; i < filtrado.length; i++) {
    objeto[i] = {
        nombre: filtrado[i],
        visitas: listeners_totales[i]
    }
}
console.log(objeto);

let mas_escuchada = objeto.sort((x, y)=>y.visitas - x.visitas)[0];

console.log(mas_escuchada);

let musicas_banda_top = [];

musicas.map((elemento)=> {
    if(elemento.artist.name == mas_escuchada.nombre){
    musicas_banda_top.push(elemento);
}
});
musicas_banda_top = musicas_banda_top.sort((x, y)=>y.listeners - x.listeners);
return musicas_banda_top;

}

const filtro = (value, index, self) => { 
    return self.indexOf(value) === index;
}




const init = () => {

    fetch("./music.json")
        .then((dada) => dada.json())
        .then((datos) => {
            Song.songs = datos;
            creacion_listeners_estilos();
            creacion_listeners_titulos();
            color_titulo("overview");
            loadSongs(datos);
        });
}

const callback_estilo_musical = (evento) => {
    let musica_pintar = [];
    let nombre = evento.target.innerHTML;
    color_titulo(evento.target.className);
    pintar_titulo(nombre);

    switch (nombre) {

        case "rock":
        case "hip-hop":
        case "indie":
        case "jazz":
        case "reggae":
            musica_pintar = loadGenre(nombre, Song.songs);
            break;

        case "Overview":
            musica_pintar = loadOverview(Song.songs);
            break;

        case "Top 10 Listened":
            musica_pintar = loadTenListened(Song.songs);
            break;

        case "The Biggest":
            musica_pintar = loadBiggest(Song.songs);
            break;
    }
    loadSongs(musica_pintar);
}

const filtrar_estilo = (estilo, array_musica) => {
    let arr = [];
    for (let i = 0; i < array_musica.length; i++) {
        if (estilo == array_musica[i].genre) {
            arr.push(array_musica[i]);
        }
    }
    return arr;
}

const color_titulo = (nombre) => {
    let overview = document.getElementsByClassName("overview")[0];
    let topten = document.getElementsByClassName("topten")[0];
    let biggest = document.getElementsByClassName("biggest")[0];

    overview.id = "";
    topten.id = "";
    biggest.id = "";

    switch (nombre) {
        case "overview":
            overview.id = "clicado";
            break;
        case "topten":
            topten.id = "clicado";
            break;

        case "biggest":
            biggest.id = "clicado";
            break;
    }
}

const pintar_titulo = (nombre) => {
    let titulos = document.getElementById("titulo");
    titulos.innerHTML = nombre;
}

const creacion_listeners_estilos = () => {
    let boton_rock = document.querySelector(".boton_rock");
    boton_rock.addEventListener("click", callback_estilo_musical);

    let boton_hiphop = document.querySelector(".boton_hiphop");
    boton_hiphop.addEventListener("click", callback_estilo_musical);

    let boton_indie = document.querySelector(".boton_indie");
    boton_indie.addEventListener("click", callback_estilo_musical);

    let boton_jazz = document.querySelector(".boton_jazz");
    boton_jazz.addEventListener("click", callback_estilo_musical);

    let boton_reggae = document.querySelector(".boton_reggae");
    boton_reggae.addEventListener("click", callback_estilo_musical);
}


const creacion_listeners_titulos = () => {

    let boton_overview = document.querySelector(".overview");
    boton_overview.addEventListener("click", callback_estilo_musical);

    let boton_topten = document.querySelector(".topten");
    boton_topten.addEventListener("click", callback_estilo_musical);

    let boton_biggest = document.querySelector(".biggest");
    boton_biggest.addEventListener("click", callback_estilo_musical);
}


const loadGenre = (nombre, musicas) => {
    let musica_filtrada = filtrar_estilo(nombre, musicas);
    return musica_filtrada;
}

window.onload = init;





