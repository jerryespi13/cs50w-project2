const socket = io();

// obtenemos lo que hay en localstorage
let usuario = localStorage.getItem("usuario")

// preguntamos si existe ese usuario en la lista de usuario
if(usuario !== null){
  socket.emit("existeUsuario", {"usuario":usuario})
}

// se conecta al chat con el usuario guardado en local storage
socket.on("usuarioConectado", function(dato){
usuario = dato["usuario"]
localStorage.usuario = usuario
window.location.href = "/canales"
})

// alertas para validacion de usuarios
socket.on('mensaje', function(dato) {
mensaje = dato["mensaje"]
document.querySelector("#alert").style.visibility = "visible"
document.querySelector("#alert").innerHTML = mensaje + `<div class="closebtn" onclick="this.parentElement.style.display='none';">&times;</div> `
});

// funcion en el boton continuar para ingresar al chat
function conectarUsuario(){
let usuarioIngresado = document.querySelector("#usuario").value
socket.emit("conectarUsuario", {"mensaje":"conectame", "usuario":usuarioIngresado})
}