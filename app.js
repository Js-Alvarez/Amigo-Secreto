let listaAmigosIngresados=[];
let cantidadIngresadaNombre = 5;
let contador = 0;

const gifsMasculinos = [
    "./assets/gif/1..gif",
    "./assets/gif/3.gif",
    "./assets/gif/5.gif",
    "./assets/gif/6.gif",
    "./assets/gif/8.gif",
    "./assets/gif/9.gif"
];

const gifsFemeninos = [
    "./assets/gif/2.f.gif",
    "./assets/gif/4.f.gif",
    "./assets/gif/7.f.gif",
    "./assets/gif/10.f.gif",
    "./assets/gif/11.f.gif",
];

let gifsUsados =[]; // Para hacer seguimiento de los GIFs que ya han sido usados.


function asignarTextoElemento(elemento,texto){
    let elementoHTML=document.querySelector(elemento);
    elementoHTML.innerHTML=texto;

};

function agregarAmigo(){
    let amigoIngresado=document.getElementById('amigo').value;
    let generoSeleccionado = document.querySelector('input[name="genero"]:checked');

    // Validar que solo tenga letras y espacios (sin números ni caracteres especiales)
    let soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!soloLetras.test(amigoIngresado)|| amigoIngresado === "") {
        asignarTextoElemento("h3", "Solo se permiten letras y espacios.");
        return;
    }

    if (!generoSeleccionado) {
        asignarTextoElemento("h3", "Selecciona un género.");
        return;
    }


    function formatearNombre(nombre) {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();}

    let amigoFormateado = formatearNombre(amigoIngresado);

    if (listaAmigosIngresados.some(amigo => amigo.nombre === amigoFormateado)) {
        asignarTextoElemento("h3", "El amigo ya está en la lista 👉👈.");
        return;
    }

    if (listaAmigosIngresados.length < 5) {
        let gifAleatorio = seleccionarGifAleatorio(generoSeleccionado.value); // Pasamos el género seleccionado a la función
        listaAmigosIngresados.push({ nombre: amigoFormateado, gif: gifAleatorio });
        actualizarListaVisual();
        contador++;
        cantidadIngresadaNombre--;


        if (contador < 5) {
            asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} amigos 🥵 `);
        } else {
            asignarTextoElemento("h3", "¡Lista completa! 🥳");
            document.getElementById("reiniciar").removeAttribute("disabled");
            
        }
    }else{
        asignarTextoElemento("h3", "No puedes ingresar más amigos 🛑" )
    }

    vaciarCampo();
}

// Función para seleccionar un GIF aleatorio sin repetir según el género
function seleccionarGifAleatorio(genero) {
    let gifsDisponibles = genero === 'M' ? gifsMasculinos : gifsFemeninos;

    if (gifsDisponibles.length === gifsUsados.length) {
        asignarTextoElemento("h3", "No hay más GIFs disponibles 😢");
        return; // Si ya se usaron todos los GIFs, no selecciona ninguno más.
    }

    let gifAleatorio;
    do {
        gifAleatorio = gifsDisponibles[Math.floor(Math.random() * gifsDisponibles.length)];
    } while (gifsUsados.includes(gifAleatorio)); // Asegura que el GIF no se haya usado antes.

    gifsUsados.push(gifAleatorio); // Marca el GIF como utilizado.
    return gifAleatorio;
}


function actualizarListaVisual() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = "";  // Limpiar la lista visual antes de agregar nuevos amigos

    // Verificamos si hay amigos en la lista
    if (listaAmigosIngresados.length === 0) {
        asignarTextoElemento("h3", "No hay amigos en la lista.");
        return;
    }

    console.log(listaAmigosIngresados);

    listaAmigosIngresados.forEach((amigo) => {
        let li = document.createElement("li"); // Crear el elemento li
        li.classList.add("amigo-item");
        
        li.innerHTML = `
        <img src="${amigo.gif}" alt="GIF de ${amigo.nombre}">
        <div class="amigo-name">${amigo.nombre}</div>
        `;

        listaHTML.appendChild(li); // Agregar el nuevo li al DOM
    });
}


function vaciarCampo(){
    document.getElementById('amigo').value="";
      
}

function generarAmigoSecreto(){
    let indiceAleatorio = Math.floor(Math.random() * listaAmigosIngresados.length);
    return listaAmigosIngresados[indiceAleatorio];
}

function sortearAmigo(){
    let imagenAmigo = document.getElementById("imagenAmigo");
    let listaAmigos = document.getElementById("listaAmigos");

    if (listaAmigosIngresados.length==5){

        let amigoSecreto = generarAmigoSecreto();
        
        asignarTextoElemento('h2', amigoSecreto.nombre);

        let gifAmigo = document.getElementById('gifAmigo');
        gifAmigo.src = amigoSecreto.gif;
        imagenAmigo.style.display = "block";
        
    }else{
        asignarTextoElemento('h2', `Completa la lista 🧐`);
        imagenAmigo.style.display = "none";        
    }
    
};


function reiniciarJuego(){
    listaAmigosIngresados = [];
    contador = 0;
    cantidadIngresadaNombre = 5;


    vaciarCampo();
    asignarTextoElemento('h2', 'Ingrese el nombre de sus amigos');
    asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} amigos`);

   
    document.getElementById('listaAmigos').innerHTML = "";
    document.getElementById("imagenAmigo").style.display = "none";
    document.getElementById("reiniciar").setAttribute('disabled', 'true');

    // Deshabilitar el botón "reiniciar"
    document.getElementById("reiniciar").setAttribute("disabled", "true");

    // Actualizar la lista visual
    actualizarListaVisual();
};


asignarTextoElemento('h2', 'Ingrese el nombre de sus amigos');
asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} de amigos`)
vaciarCampo("");
document.getElementById("imagenAmigo").style.display = "none";
