const socket = io();
// Pedimos la lista de todos los chats
socket.emit("get_room_list",{"nombre":"Jerry"})

//Obtenemos la lista de todos los chats
socket.on("room_list", function(dato){
    const listaChat = document.querySelector('#listaChat');
    // limpiamos donde introduciremos los chats
    listaChat.innerHTML='';
    dato.rooms.forEach(room => {
        // html de cada chat
        const htmlListadoChat = `  <div class="chat active">
                            <div class="imgChat">
                                <img src="/static/img/user.png" alt="" class="cover">
                            </div>
                            <div class="detallesChat">
                                <div class="nombreChat" id="nombreChat">
                                    <h4>`+ room[0]["nombre_sala"] +`</h4>
                                    <!--fecha o hora-->
                                    <p class="time">4:20</p>
                                </div>
                            <div class="mensajeChat">
                                <p>`+ room[1]["mensajes"] +`</p>
                            </div>
                        </div>`
        // introducimos cada chat listado al html
        listaChat.innerHTML+=htmlListadoChat;
    });
});

function enviarSaludo(){
    let nombre = document.querySelector("#nombre").value
    let mensaje = document.querySelector("#mensaje").value

        socket.emit("saludo", {"nombre": nombre, "mensaje":mensaje})
    console.log(mensaje)
}

socket.on("saludoRecibido", function(dato){
    alert(dato.nombre + "dice: " + dato.mensaje)
})
