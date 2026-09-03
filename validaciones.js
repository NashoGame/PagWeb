// 1. CREAMOS UNA BASE DE DATOS PEQUEÑA
// Un "Array" (lista) que contiene "Objetos" (las llaves {}). Cada objeto guarda los datos de una película.
const peliculas = [
    { titulo: "Volver al Futuro", sinopsis: "Un joven viaja accidentalmente al pasado...", precio: "$5.000" },
    { titulo: "Matrix", sinopsis: "Un hacker descubre la verdadera naturaleza de su realidad.", precio: "$4.500" },
    { titulo: "Jurassic Park", sinopsis: "Dinosaurios clonados escapan de su parque temático.", precio: "$6.000" }
];

// 2. VARIABLES DE CONTROL
let indiceActual = 0; // Un contador que empieza en 0. Representa qué película de la lista estamos viendo.

// Guardamos en variables las cajas HTML que vamos a manipular, buscándolas por su ID
const infoSection = document.getElementById("hero-info"); // La caja izquierda
const listaCatalogo = document.getElementById("lista-peliculas"); // La lista derecha

// 3. INYECTAR LAS PELÍCULAS EN LA LISTA DERECHA
// "forEach" recorre la lista de películas una por una.
peliculas.forEach((peli, index) => {
    // "innerHTML +=" agarra la caja vacía y le inserta código HTML por dentro.
    // Si es la película 0 (la primera), le agrega la clase 'activa' para que se ilumine de azul.
    listaCatalogo.innerHTML += `<div class="mini-peli ${index === 0 ? 'activa' : ''}" id="thumb-${index}"><b>${peli.titulo}</b></div>`;
});

// 4. FUNCIÓN PARA CAMBIAR LOS TEXTOS DE LA IZQUIERDA
function actualizarPantalla() {
    // Busca las etiquetas <h2 id="pelicula-titulo">, etc., y reemplaza su texto ("innerText") 
    // con los datos de la película que indique el "indiceActual"
    document.getElementById("pelicula-titulo").innerText = peliculas[indiceActual].titulo;
    document.getElementById("pelicula-sinopsis").innerText = peliculas[indiceActual].sinopsis;
    document.getElementById("pelicula-precio").innerText = peliculas[indiceActual].precio;
}

// Ejecutamos la función una vez al cargar la página para que no diga "Cargando..."
actualizarPantalla(); 

// 5. EL BUCLE DE TIEMPO (CARRUSEL)
// "setInterval" es un reloj que repite el código de adentro infinitamente cada cierto tiempo (3000 = 3 segundos).
setInterval(() => {
    
    // PASO A: Iniciar la difuminación
    infoSection.style.opacity = 0; // Vuelve la caja izquierda invisible (el CSS lo hace suave gracias al "transition")
    document.getElementById(`thumb-${indiceActual}`).classList.remove('activa'); // Le quita el borde azul a la peli actual en la derecha
    
    // PASO B: Esperar a que termine de desaparecer antes de cambiar las letras
    // "setTimeout" retrasa la ejecución del siguiente código por 500 milisegundos (medio segundo)
    setTimeout(() => {
        
        // Suma 1 al contador para pasar a la siguiente peli. 
        // El "% peliculas.length" hace que si llega a 3 (el límite), vuelva a dar cero, creando un bucle infinito.
        indiceActual = (indiceActual + 1) % peliculas.length; 
        
        // Ejecuta la función para poner los textos nuevos (mientras la caja sigue invisible)
        actualizarPantalla(); 
        
        // Le pone el borde azul a la NUEVA película en la lista derecha
        document.getElementById(`thumb-${indiceActual}`).classList.add('activa');
        
        // PASO C: Volver a mostrar todo
        infoSection.style.opacity = 1; // Vuelve la caja izquierda visible de nuevo con los textos ya cambiados
        
    }, 500); 
    
}, 3000);