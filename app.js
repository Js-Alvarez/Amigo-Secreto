let listaAmigosIngresados=[];
let cantidadIngresadaNombre = 5;
let contador = 0;


function asignarTextoElemento(elemento,texto){
    let elementoHTML=document.querySelector(elemento);
    elementoHTML.innerHTML=texto;

};

function agregarAmigo(){
    let amigoIngresado=document.getElementById('amigo').value;

    // Validar que solo tenga letras y espacios (sin números ni caracteres especiales)
    let soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!soloLetras.test(amigoIngresado)) {
        asignarTextoElemento("h3", "Solo se permiten letras y espacios.😅");
        return;
    }

    function formatearNombre(nombre) {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    }

    let amigoFormateado = formatearNombre(amigoIngresado);

    if (listaAmigosIngresados.includes(amigoFormateado)) {
        asignarTextoElemento("h3","El amigo ya está en la lista 👉👈.");
        return;
    }

    if (listaAmigosIngresados.length < 5) {
        listaAmigosIngresados.push(amigoFormateado);
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

function actualizarListaVisual() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = ""; 

    listaAmigosIngresados.forEach((amigo) => {
        let li = document.createElement("li");
        li.textContent = amigo;
        listaHTML.appendChild(li);
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

    if (listaAmigosIngresados.length==5){
        let amigoSecreto = generarAmigoSecreto();
        asignarTextoElemento('h2', `Tu amigo secreto es: 🌟 ${amigoSecreto}🌟`);
        imagenAmigo.style.display = "block"; 
    }else{
        asignarTextoElemento('h2', `Completa la lista 🧐`);

        imagenAmigo.style.display = "none";        
    }
    
};

function condicionesGenerales(){
    agregarAmigo();
    actualizarListaVisual()
    generarAmigoSecreto();
    sortearAmigo();
    vaciarCampo()
};

function reiniciarJuego(){
    listaAmigosIngresados = [];
    contador = 0;
    cantidadIngresadaNombre = 5;


    vaciarCampo();
    asignarTextoElemento('h2', 'Ingrese el nombre de sus amigos');
    asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} amigos`);

   
    document.getElementById("imagenAmigo").style.display = "none";

    // Deshabilitar el botón "reiniciar"
    document.getElementById("reiniciar").setAttribute("disabled", "true");

    // Actualizar la lista visual
    actualizarListaVisual();
};
asignarTextoElemento('h2', 'Ingrese el nombre de sus amigos');
asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} de amigos`)
vaciarCampo("");
document.getElementById("imagenAmigo").style.display = "none";
