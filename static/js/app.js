console.log("Hola")

const socket = io();

function enviarSaludo(){
    let nombre = document.querySelector("#nombre").value
    let mensaje = document.querySelector("#mensaje").value

        socket.emit("saludo", {"nombre": nombre, "mensaje":mensaje})
    console.log(mensaje)
}

socket.on("saludoRecibido", function(dato){
    alert(dato.nombre + "dice: " + dato.mensaje)
})
