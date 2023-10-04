const socket = io();

//agragamos algunos estilos a ciertos elementos en el DOM
usuarioDefault = document.querySelector("#nombreusuariodefault")
nombreUsuario = document.querySelector("#nombreusuario")
usuarioDefault.style.visibility = "visible"
nombreUsuario.style.visibility = "hidden"

if(localStorage.getItem("chatActivo")){
let chatSeleccionadoLocalStorage = localStorage.getItem("chatActivo")
if(chatSeleccionadoLocalStorage){
    let room = chatSeleccionadoLocalStorage
    joinRoom(room)
    }
}
usuario = localStorage.getItem("usuario")
// redirigimos a index al usuario que quiera entrar al enlace  de los chat
// sin haberse registrado
if(usuario === null){
    window.location.href="/"
  }

// cerrar session
function cerrarSesion(){
    socket.emit("cerrarSesion", {"usuario":usuario})
}
//limpiar local storage al cerrar session
socket.on("sesionCerrada", function(dato){
    localStorage.clear()
    // redirijimos a index
    window.location.href="/"
})

// Pedimos la lista de todos los chats
function listarSalas(){
    socket.emit("get_room_list",{"nombre":" "})

//Obtenemos la lista de todos los chats
socket.on("room_list", function(dato){
    const listaChat = document.querySelector('#listaChat');
    // limpiamos donde introduciremos los chats
    listaChat.innerHTML='';
    dato.rooms.forEach(room => {
        // variable para guardar el dato de fecha a mostrar
        // si el mensaje es de hoy se mostrará la hora, si no, se mostrará la fecha
        let fechaMostrar = ""
        let ultimoChat = room[3] - 1;
        // obtenemos la fecha del ultimo chat
        let fechaUltimoChat = room[1]["mensajes"][ultimoChat][1][0]
        // obtenemos la hora del ultimo chat
        let horaUltimoChat = room[1]["mensajes"][ultimoChat][1][1]
        // variable donde guardamos la fecha actual, la cual compararemos con la fehca del ultimo mensaje
        let fechaActual =""
        // obtenemos la informacion de la fecha actual
        let date = new Date();
        let day = `0${date.getDate()}`.slice(-2); 
        let month = `0${date.getMonth() + 1}`.slice(-2);
        let year = date.getFullYear();
        // formateamos la fecha actual para poder compararla con la fecha del ultimo mensaje en el chat
        fechaActual = day + "-" + month + "-" + year
        // si ambas fechas son iguales
        if (fechaActual === fechaUltimoChat){
            // mostramos solo la hora
            fechaMostrar = horaUltimoChat
        }
        else{
            // si las fechas no son iguales mostramos la fecha del ultimo chat
            fechaMostrar = fechaUltimoChat
        }
        
        // html de cada chat
        const htmlListadoChat = `<label for="radioChats`+room[0]["nombre_sala"]+`">
        <div class="chat active" id="`+room[0]["nombre_sala"]+`" onclick="joinRoom('`+ room[0]["nombre_sala"] +`')">
        <div class="imgChat">
            <img src="/static/img/profile.png" alt="" class="cover">
        </div>
        <div class="detallesChat">
            <div class="nombreChat">
                <h4>`+ room[0]["nombre_sala"] +`</h4>
                <!--fecha o hora-->
                <p class="time">`+ fechaMostrar +`</p>
            </div>
        <div class="mensajeChat">
            <p>`+ room[1]["mensajes"][ultimoChat][0] +`</p>
        </div>
    </div>
                                </label>
        
        `
        // introducimos cada chat listado al html
        listaChat.innerHTML+=htmlListadoChat;
    });
});
}
listarSalas()

// funcion para unirse a un chat o room
function joinRoom(sala){
    let room = sala
    socket.emit("join", {"room":room})
}

// uniendose a sala o chat
socket.on("chatConectado", function(dato){
    //nombre del chat o sala
    document.querySelector("#headerchat").style.visibility = "visible"
    document.querySelector("#nombreChat").innerHTML = dato["chat"] + ` <br><span>online</span>`
    document.querySelector("#chatInput").style.visibility = "visible"

    // creamos el html para la sala con un id
    var chat = document.querySelector('#listaMensajes');
    // si el html de la sala no existe se crea, si existe no se crea para no repetir
    if (!document.querySelector('#chats'+dato["chat"])){
        chat.innerHTML += ` <input type="radio" name="radioChat" id="radioChats`+dato["chat"]+`" checked>
                            <div class="chatBox" id="chats`+dato["chat"]+`"></div>`
                        }
                        

    // añadimos el mensaje de bienbenida
    var mensaje = document.querySelector("#chats"+dato["chat"]);
    mensaje.innerHTML += `<div class="mensaje my_mensaje">
    <p>`+ dato["msg"] +`<br><span>12:16</span></p>
    </div>`

    localStorage.chatActivo = dato["chat"]
    document.querySelector("#"+dato["chat"]).removeAttribute("onclick")
})

function leaveRoom(){
    let room = localStorage.getItem("chatActivo")
    socket.emit('leave', { 'room': room, "usuario":usuario })
    document.querySelector("#headerchat").style.visibility = "hidden"
    document.querySelector("#chatInput").style.visibility = "hidden"
    document.querySelector("#chats"+room).innerHTML=""
}

socket.on("chatDesconectado", function(dato){
    console.log(dato["msg"])
    var mensaje = document.querySelector("#chats"+dato["chat"]);
    mensaje.innerHTML += `<div class="mensaje my_mensaje">
    <p>`+ dato["msg"] +`<br><span>12:16</span></p>
    </div>`

})

// creacion de sala
function crearSala(){
    nombreSala = document.querySelector("#nombreSala").value
    socket.emit("crearSala", {"sala":nombreSala})
}

socket.on("salaCreada", function(dato){
    // limpiamos el input
    document.querySelector("#nombreSala").value = ""
    // listamos las salas
    listarSalas()
    // volvemos a la vista sala
    document.querySelector("#chats").checked = true
    //joinRoom(dato["sala"])
})

// creacion de sala con enter
function enter(event) {
    // Número 13 es la tecla 'Enter'
    if (event.keyCode === 13) {
      crearSala()
    }
  }

function enviarSaludo(){
    let nombre = document.querySelector("#nombre").value
    let mensaje = document.querySelector("#mensaje").value

        socket.emit("saludo", {"nombre": nombre, "mensaje":mensaje})
    console.log(mensaje)
}

socket.on("saludoRecibido", function(dato){
    alert(dato.nombre + "dice: " + dato.mensaje)
})

// funcion para editar el nombre de usuario
function editarConfirmar(x){
    x.classList.toggle("fa-check");

    // alternamis visibilidad entre los dos elementos
    if(usuarioDefault.style.visibility === "visible"){
        usuarioDefault.style.visibility = "hidden"
        nombreUsuario.style.visibility = "visible"
    }
    else{
        usuarioDefault.style.visibility = "visible"
        nombreUsuario.style.visibility = "hidden"
    }
    nombreUsuario.value = usuarioDefault.innerHTML
    nombreUsuario.focus()
    
}
document.querySelector("#nombreusuariodefault").innerHTML = usuario