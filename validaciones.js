// BASE DE DATOS LOCAL: Un arreglo (Array) que contiene objetos ({}). 
// Cada objeto guarda las propiedades que construyen la vista de la película.
// BASE DE DATOS LOCAL
const peliculas = [
    { titulo: "Volver al Futuro", sinopsis: "Marty McFly, un estudiante de 17 años, es enviado accidentalmente treinta años al pasado en un artefacto inventado por su amigo.", precio: "$5.000", fondo: "img/img-fondo-1.jpg", caratula: "img/vhs-1.jpg" },
    { titulo: "Matrix", sinopsis: "Un hacker se da cuenta por medio de otros rebeldes de la naturaleza de su realidad y su rol en la guerra contra los controladores.", precio: "$4.500", fondo: "img/img-fondo-2.jpg", caratula: "img/vhs-2.jpg" }, 
    { titulo: "Jurassic Park", sinopsis: "Gracias al ADN fosilizado en ámbar, John Hammond da vida a varias especies de dinosaurios y crea Jurassic Park, un parque temático en una isla de Costa Rica. Pero lo que parecía un sueño se convierte rápidamente en pesadilla.", precio: "$6.000", fondo: "img/img-fondo-3.jpg", caratula: "img/vhs-3.jpg" },
    { titulo: "Pesadilla en la calle Elm", sinopsis: "Varias personas son perseguidas por un cruel asesino en serie que mata a sus víctimas durante sus sueños. Mientras los supervivientes tratan de encontrar el motivo, el asesino no desperdiciará ninguna ocasión para matarlos..", precio: "$5.500", fondo: "img/img-fondo-4.jpg", caratula: "img/vhs-4.jpg" }
];

// VARIABLE DE CONTROL
let indiceActual = 0; // Guarda el número de la película que se está viendo
let temporizador; // Variable que guardará el reloj automático para poder detenerlo o iniciarlo

// REFERENCIAS HTML: Guardamos en variables las etiquetas HTML buscando por su atributo "id".
const bannerSection = document.getElementById("hero-banner"); // El recuadro grande izquierdo
const listaCatalogo = document.getElementById("lista-peliculas"); // El recuadro vertical derecho

// GENERACIÓN AUTOMÁTICA DEL CATÁLOGO: Bucle que recorre la base de datos "peliculas".
// 'peli' es el objeto actual, 'index' es el número de vuelta (0, 1, 2).
peliculas.forEach((peli, index) => {
    // Inyecta código HTML directamente en la lista derecha por cada vuelta del bucle.
    // NUEVO: Agregamos style="background-image" para la foto de fondo del botón.
    // NUEVO: Agregamos onclick="cambiarPeliculaManual(numero)" para detectar cuando le haces clic.
    listaCatalogo.innerHTML += `
        <div class="mini-peli ${index === 0 ? 'activa' : ''}" 
             id="thumb-${index}" 
             style="background-image: url('${peli.fondo}');"
             onclick="cambiarPeliculaManual(${index})">
             <b>${peli.titulo}</b>
        </div>
    `;
});

// FUNCIÓN PRINCIPAL DE CAMBIO: Lee la película actual y actualiza el HTML con sus datos.
function actualizarPantalla() {
    // Busca las etiquetas y sobreescribe su texto (.innerText) con la información del array.
    document.getElementById("pelicula-titulo").innerText = peliculas[indiceActual].titulo;
    document.getElementById("pelicula-sinopsis").innerText = peliculas[indiceActual].sinopsis;
    document.getElementById("pelicula-precio").innerText = peliculas[indiceActual].precio;
    
    // Sobreescribe el atributo 'src' de la imagen pequeña con la carátula nueva.
    document.getElementById("vhs-portada").src = peliculas[indiceActual].caratula;
    
    // Sobreescribe el fondo del CSS insertando la URL de la imagen de fondo de manera dinámica.
    bannerSection.style.backgroundImage = `url('${peliculas[indiceActual].fondo}')`;
}

// FUNCIÓN DE TRANSICIÓN CON EFECTO DE DIFUMINADO
function ejecutarTransicion(nuevoIndice) {
    bannerSection.style.opacity = 0; // Vuelve la pantalla principal transparente (negra)
    document.getElementById(`thumb-${indiceActual}`).classList.remove('activa'); // Apaga el botón azul del menú derecho
    
    // Espera medio segundo (500ms) a que la pantalla se ponga negra antes de cambiar datos
    setTimeout(() => {
        indiceActual = nuevoIndice; // Actualiza el número de película al nuevo destino
        actualizarPantalla(); // Pone los textos y fotos nuevos de forma invisible
        
        document.getElementById(`thumb-${indiceActual}`).classList.add('activa'); // Prende el botón azul de la nueva peli
        bannerSection.style.opacity = 1; // Vuelve a hacer visible la pantalla principal
    }, 500); 
}

// INICIAR EL RELOJ AUTOMÁTICO (CARRUSEL)
function iniciarReloj() {
    // Guarda el reloj en la variable 'temporizador' para poder apagarlo después
    temporizador = setInterval(() => {
        // Calcula cuál es la siguiente película en la lista (y vuelve a 0 si llega al final)
        let siguiente = (indiceActual + 1) % peliculas.length; 
        ejecutarTransicion(siguiente); // Ejecuta el cambio visual
    }, 6000); // Se repite cada 3 segundos
}

// NUEVO: FUNCIÓN QUE SE EJECUTA AL HACER CLIC EN UN BOTÓN
function cambiarPeliculaManual(indiceClickeado) {
    // Si haces clic en la película que ya estás viendo, la función se cancela ("return") y no hace nada
    if (indiceClickeado === indiceActual) return; 
    
    // Apaga el reloj automático temporalmente. Esto evita que la pantalla cambie sola justo después de hacer tu clic
    clearInterval(temporizador); 
    
    // Ejecuta el cambio visual hacia la película que clickeaste
    ejecutarTransicion(indiceClickeado); 
    
    // Vuelve a encender el reloj automático para que siga rotando sola a partir de tu elección
    iniciarReloj(); 
}

// ARRANQUE INICIAL AL CARGAR LA PÁGINA
actualizarPantalla(); // Carga la primera peli para que no diga "Cargando..."
iniciarReloj(); // Prende el motor automático por primera vez