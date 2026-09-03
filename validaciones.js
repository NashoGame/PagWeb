// BASE DE DATOS LOCAL: Un arreglo (Array) que contiene objetos ({}). 
// Cada objeto guarda las propiedades que construyen la vista de la película.
const peliculas = [
    { titulo: "Volver al Futuro", sinopsis: "Marty McFly, un estudiante de 17 años, es enviado accidentalmente treinta años al pasado en un artefacto inventado por su amigo.", precio: "$5.000", fondo: "img/img-fondo-1.jpg", caratula: "img/vhs-1.jpg" },
    { titulo: "Matrix", sinopsis: "Un hacker se da cuenta por medio de otros rebeldes de la naturaleza de su realidad y su rol en la guerra contra los controladores.", precio: "$4.500", fondo: "img/img-fondo-2.jpg", caratula: "img/vhs-2.jpg" }, // *Cambiar rutas cuando haya fotos nuevas
    { titulo: "Jurassic Park", sinopsis: "Gracias al ADN fosilizado en ámbar, John Hammond da vida a varias especies de dinosaurios y crea Jurassic Park, un parque temático en una isla de Costa Rica. Pero lo que parecía un sueño se convierte rápidamente en pesadilla.", precio: "$6.000", fondo: "img/img-fondo-3.jpg", caratula: "img/vhs-3.jpg" }
];

// VARIABLE DE CONTROL: Almacena en qué posición de la lista de películas estamos (0 = primera).
let indiceActual = 0;

// REFERENCIAS HTML: Guardamos en variables las etiquetas HTML buscando por su atributo "id".
const bannerSection = document.getElementById("hero-banner"); // El recuadro grande izquierdo
const listaCatalogo = document.getElementById("lista-peliculas"); // El recuadro vertical derecho

// GENERACIÓN AUTOMÁTICA DEL CATÁLOGO: Bucle que recorre la base de datos "peliculas".
// 'peli' es el objeto actual, 'index' es el número de vuelta (0, 1, 2).
peliculas.forEach((peli, index) => {
    // Inyecta código HTML directamente en la lista derecha por cada vuelta del bucle.
    // Si el 'index' es igual a 0, le añade la clase 'activa', si no, lo deja vacío.
    listaCatalogo.innerHTML += `<div class="mini-peli ${index === 0 ? 'activa' : ''}" id="thumb-${index}"><b>${peli.titulo}</b></div>`;
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

// PRIMERA EJECUCIÓN: Llama a la función al abrir la página para cargar la primera peli y quitar el texto de "Cargando...".
actualizarPantalla();

// BUCLE DE TIEMPO (CARRUSEL): Se ejecuta constantemente cada 3000 milisegundos (3 segundos).
setInterval(() => {
    // FASE 1 (Salida visual): Cambia la opacidad de la caja grande a 0 para generar el difuminado.
    bannerSection.style.opacity = 0; 
    
    // Le quita el marco azul brillante a la película antigua en el menú derecho.
    document.getElementById(`thumb-${indiceActual}`).classList.remove('activa');
    
    // SETTIMEOUT: Pausa el proceso 500 milisegundos para permitir que la pantalla se vuelva negra (el efecto Fade de CSS) antes de cambiar letras o fotos bruscamente.
    setTimeout(() => {
        
        // Sube de nivel. Operador módulo (%) hace que si indiceActual es 3 (límite del array), se reinicie a 0.
        indiceActual = (indiceActual + 1) % peliculas.length; 
        
        // Ejecuta la función de recarga con los datos de la película nueva de forma silenciosa (mientras está oscuro).
        actualizarPantalla(); 
        
        // Enciende el marco azul en el catálogo de la derecha para la nueva película.
        document.getElementById(`thumb-${indiceActual}`).classList.add('activa');
        
        // FASE 2 (Entrada visual): Regresa la opacidad a 1 mostrando la película nueva con efecto de difuminado.
        bannerSection.style.opacity = 1; 
        
    }, 500); 
    
}, 3000);