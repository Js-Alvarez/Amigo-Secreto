let listaAmigosIngresados=[];
let cantidadIngresadaNombre = 5;
contador = 0;
cantidadIngresadaNombre= 5;

function asignarTextoElemento(elemento,texto){
    let elementoHTML=document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
    return;
};

function agregarAmigo(){
    let amigoIngresado=document.getElementById('amigo').value;

    // Validar que solo tenga letras y espacios (sin números ni caracteres especiales)
    let soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!soloLetras.test(amigoIngresado)) {
        asignarTextoElemento("h3", "Solo se permiten letras y espacios.😅");
        return;
    }

    let amigoFormateado = amigoIngresado.toLowerCase();


    if (!listaAmigosIngresados.includes(amigoFormateado)) {
        listaAmigosIngresados.push(amigoFormateado);
        console.log(listaAmigosIngresados);

        contador++;
        cantidadIngresadaNombre--;

        if (contador < 5) {
            asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} amigos 🥵 `);
        
            if (listaAmigosIngresados.length === 5) {
            asignarTextoElemento("h3", "¡Lista completa! 🥳");
            }
       
        } else {
        asignarTextoElemento("h3","El amigo ya está en la lista 👉👈.");
        }

    vaciarCampo();
    }
}


function vaciarCampo(){
    document.getElementById('amigo').value="";
      
}

function generarAmigoSecreto(){
   let amigoSecretoSorteado=Math.floor(Math.random()*listaAmigosIngresados.length);
   let amigoSecreto=listaAmigosIngresados[amigoSecretoSorteado];
   return amigoSecreto;
   
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



asignarTextoElemento('h2', 'Ingrese el nombre de sus amigos');
asignarTextoElemento("h3", `Faltan ingresar ${cantidadIngresadaNombre} de amigos`)
vaciarCampo("");
document.getElementById("imagenAmigo").style.display = "none";
