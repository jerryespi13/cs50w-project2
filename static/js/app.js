// Usuario
let usuario = localStorage.getItem("usuario")
// redirigimos a index al usuario que quiera entrar al enlace  de los chat
// sin haberse registrado
if(usuario === null){
    window.location.href="/"
  }

  
  //agragamos algunos estilos a ciertos elementos en el DOM
  usuarioDefault = document.querySelector("#nombreusuariodefault")
  nombreUsuario = document.querySelector("#nombreusuario")
  usuarioDefault.style.visibility = "visible"
  nombreUsuario.style.visibility = "hidden"
  
// ajuste automatico de pantalla
let checkChat = false
window.addEventListener('resize', function() {
    // obtenemos el ancho de la pantalla
    var width = window.innerWidth;
  
    var leftSide = document.querySelector('.leftSide');
    var rightSide = document.querySelector('.rigthSide');
  
    // si la pantalla es menor o igual de 768
    if (width <= 768 ) {
        // y se presiono un chat entonces se muestra en toda la pantalla la seccion chat
        if(checkChat){
            leftSide.style.display = "none"
            rightSide.style.display = "block"
        }
        else{
            // si no se ha ingresado a ningun chat entonces se muestra en la pantalla 
            // la lista de los chats disponible
            leftSide.style.display = "block"
            rightSide.style.display = "none"
        }

    } else {
      // Aplica los estilos para pantallas grandes
      leftSide.style.display = "blok"
      rightSide.style.display = "block"
    }
  });

const socket = io();

// Recordando sala del usuario
// si existe una sala en el localstorage, se une directamente a esa sala al cargar la pagina
if(localStorage.getItem("chatActivo")){
    joinRoom(localStorage.getItem("chatActivo"))
}


// cerrar session
function cerrarSesion(){
    socket.emit("cerrarSesion", {"usuario":usuario})
    // al cerrar sesion tambien se abandona la sala
    leaveRoom()
}
socket.on("sesionCerrada", function(dato){
    //limpiar local storage al cerrar session
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
        let fechaUltimoChat = (ultimoChat === -1) ?  "" : room[1]["mensajes"][ultimoChat][1][0]
        // obtenemos la hora del ultimo chat
        let horaUltimoChat = (ultimoChat === -1) ? "" : room[1]["mensajes"][ultimoChat][1][1] 
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
        
        // html de cada chat (leftside)
        const htmlListadoChat = (ultimoChat === -1) ? `<label for="radioChats`+room[0]["nombre_sala"]+`">
                                    <div class="chat active" id="`+room[0]["nombre_sala"]+`" onclick="joinRoom('`+ room[0]["nombre_sala"] +`')">
                                        <div class="imgChat">
                                            <img src="/static/img/profile.png" alt="" class="cover">
                                        </div>
                                        <div class="detallesChat">
                                            <div class="nombreChat">
                                                <h4>`+ room[0]["nombre_sala"] +`</h4>
                                                <!--fecha o hora-->
                                                <p class="time" id="fechaUltimoMensaje`+room[0]["nombre_sala"]+`">`+ fechaMostrar +`</p>
                                            </div>
                                        <div class="mensajeChat">
                                            <p id="ultimoMensaje`+room[0]["nombre_sala"]+`"></p>
                                        </div>
                                    </div>
                                </label>`
                                :
                                `<label for="radioChats`+room[0]["nombre_sala"]+`">
                                    <div class="chat active" id="`+room[0]["nombre_sala"]+`" onclick="joinRoom('`+ room[0]["nombre_sala"] +`')">
                                        <div class="imgChat">
                                            <img src="/static/img/profile.png" alt="" class="cover">
                                        </div>
                                        <div class="detallesChat">
                                            <div class="nombreChat">
                                                <h4>`+ room[0]["nombre_sala"] +`</h4>
                                                <!--fecha o hora-->
                                                <p class="time" id="fechaUltimoMensaje`+room[0]["nombre_sala"]+`">`+ fechaMostrar +`</p>
                                            </div>
                                        <div class="mensajeChat">
                                            <p id="ultimoMensaje`+room[0]["nombre_sala"]+`">`+ room[1]["mensajes"][ultimoChat][0] +`</p>
                                        </div>
                                    </div>
                                </label>`
        // introducimos cada chat listado al html
        listaChat.innerHTML+=htmlListadoChat;
    });
});
}
listarSalas()

// funcion para unirse a un chat o room
function joinRoom(sala){
    let room = sala
    let usuario = localStorage.getItem("usuario")
    if(localStorage.getItem("chatActivo")){
        // al unirse a otra sala primero se abandona la actual
        leaveRoom()
    }
    socket.emit("join", {"room":room, "usuario":usuario})

    // obtenemos el tamaño de la pantalla para en dependencia de ese valor saber que mostrar
    let width = window.innerWidth
    checkChat = true
    // si el ancho es menor que 768px se muestra en pantalla completa el chat seleccionado
    if(width <= 768){
        document.querySelector(".container .leftSide").style.display = "none"
        document.querySelector(".container .rigthSide").style.display = "block"
    }
    // si no, se muestra como esta definido para dispositivos de tamaños de pantallas mas grandes
    else{
        document.querySelector(".container .leftSide").style.display = "block"
        document.querySelector(".container .rigthSide").style.display = "block"
    }
}

// uniendose a sala o chat
socket.on("chatConectado", function(dato){
    //nombre del chat o sala en rigthSide
    document.querySelector("#headerchat").style.visibility = "visible"
    document.querySelector("#nombreChat").innerHTML = dato["chat"] + ` <br><span>online</span>`
    document.querySelector("#chatInput").style.visibility = "visible"

    // creamos el html para la sala con un id
    var chat = document.querySelector('#listaMensajes');
    // si el html de la sala no existe se crea, si existe no se crea para no repetir
    if (!document.querySelector('#chats'+dato["chat"])){
        chat.innerHTML += ` <input type="radio" class="radioChat" name="radioChat" id="radioChats`+dato["chat"]+`" checked>
                            <div class="chatBox" style="display: none;" id="chats`+dato["chat"]+`"></div>`
                        }
                        
    
    // mostramos los chat en la sala
    var mensaje = document.querySelector("#chats"+dato["chat"]);
    mensaje.innerHTML=""
    // se pinta cada mensaje del chat
    dato.mensajes.forEach(mensajeEnMemoria=> {

    // los mensajes propios los ponemos a la derecha
    if(mensajeEnMemoria[2]===localStorage.getItem("usuario")){
        // si es imagen
        if ( mensajeEnMemoria[0].includes(dato["chat"])){
            mensaje.innerHTML +=    `<div class="mensaje my_mensaje">
                                    <p><span>`+mensajeEnMemoria[1][1]+`</span>
                                    <img src="static/uploads/`+mensajeEnMemoria[0]+`.png" alt="" style="width: 100%; objec-fit: cover; border-radius: 5px;">
                                    </p>
                                </div>`
        }
        // si es mensaje normal
        else{
            mensaje.innerHTML +=   `<div class="mensaje my_mensaje">
            <p>`+ mensajeEnMemoria[0] +`<br><span>`+mensajeEnMemoria[1][1]+`</span></p>
            </div>`
        }
    }

    // los de mas a la izquierda
    else{
        // si es una imagen
        if ( mensajeEnMemoria[0].includes(dato["chat"])){
            mensaje.innerHTML +=    `<div class="mensaje friend_mensaje">
                                    <p><span>`+mensajeEnMemoria[2]+`</span><span>`+mensajeEnMemoria[1][1]+`</span>
                                    <img src="static/uploads/`+mensajeEnMemoria[0]+`.png" alt="" style="width: 100%; border-radius: 5px;">
                                    </p>
                                </div>`
        }
        // si es mensaje normal
        else{
            mensaje.innerHTML +=   `<div class="mensaje friend_mensaje">
            <p><span>`+mensajeEnMemoria[2]+`</span><br>`+ mensajeEnMemoria[0] +`<br><span>`+mensajeEnMemoria[1][1]+`</span></p>
            </div>`
        }
    }

    })

    // añadimos el mensaje de bienvenida
    mensaje.innerHTML +=    `<div class="log">
                                <p>`+ dato["msg"] +`<br><span>`+dato["fecha"][1]+`</span></p>
                            </div>`
    mensaje.style.display = "block"
    // actualizamos el chat en localStorage
    localStorage.chatActivo = dato["chat"]
    // automaticamente ponemos el cursor en el input donde se escriben los mensajes
    document.querySelector("#mensaje").focus()

    // autoscroll al ultimo mensaje enviado
    mensaje.lastChild.scrollIntoView(false)
})

// Funcion para abandonar chat
function leaveRoom(){
    let sala = localStorage.getItem("chatActivo")
    let usuario = localStorage.getItem("usuario")
    let mensaje = document.querySelector("#chats"+sala)
    // Eliminamos la variable chatActivo en localStorage
    localStorage.removeItem('chatActivo');
    // limpiamos ciertas cosasa en la pantalla
    if(mensaje){
        mensaje.style.display = "none"
        document.querySelector("#headerchat").style.visibility = "hidden"
        document.querySelector("#chatInput").style.visibility = "hidden"
        document.querySelector("#ultimoMensaje"+sala).innerHTML =""
        document.querySelector("#fechaUltimoMensaje"+sala).innerHTML=""
    }
    socket.emit('leave', { 'room': sala, "usuario":usuario })

    // obtenemos el ancho de pantalla
    let width = window.innerWidth
    checkChat = false
    // si es tamaño de dispositivo movil entonces se muestra en pantalla completa la lista de los chats
    if(width <= 768){
        document.querySelector(".container .leftSide").style.display = "block"
        document.querySelector(".container .rigthSide").style.display = "none"
    }
    // si no, se muestra para dispositivo con pantallas mas grandes
    else{
        document.querySelector(".container .leftSide").style.display = "block"
        document.querySelector(".container .rigthSide").style.display = "block"
    }
}

// informamos que usuario ha abandonado el chat
socket.on("chatDesconectado", function(dato){
    var mensaje = document.querySelector("#chats"+dato["chat"]);
    mensaje.innerHTML +=    `<div class="log">
                                <p>`+ dato["msg"] +`<br><span>`+dato["fecha"][1]+`</span></p>
                            </div>`

    // autoscroll al ultimo mensaje enviado
    mensaje.lastChild.scrollIntoView(false)
})

// funcion para mandar mensajes
function sendMenssage(){
    let sala = localStorage.getItem("chatActivo")
    let mensaje = document.querySelector("#mensaje").value
    let usuario = localStorage.getItem("usuario")
    socket.emit("mensaje",{"sala":sala, "mensaje":mensaje, "usuario":usuario})
    //limpiamos el input
    document.querySelector("#mensaje").value = ""
    // posicionamos el cursor en el input
    document.querySelector("#mensaje").focus()
}

// recibiendo el mensaje
socket.on("mensajeRecibido", function(dato){
    let mensaje = document.querySelector("#chats"+dato["chat"])

    // Actualizamos el chat del chat en la lista chats (leftSide)
    const ultimoMensaje = document.querySelector("#ultimoMensaje"+dato["chat"])
    const fechaUltimoMensaje = document.querySelector("#fechaUltimoMensaje"+dato["chat"])
    ultimoMensaje.innerHTML = dato["mensaje"]
    fechaUltimoMensaje.innerHTML = dato["fecha"][1]

    // los mensajes propios los ponemos a la derecha
    if(dato["usuario"]===localStorage.getItem("usuario")){
        mensaje.innerHTML +=    `<div class="mensaje my_mensaje">
                                    <p>`+ dato["mensaje"] +`<br><span>`+dato["fecha"][1]+`</span></p>
                                </div>`
    }
    // los de mas a la izquierda
    else{
        mensaje.innerHTML +=    `<div class="mensaje friend_mensaje">
                                    <p><span>`+dato["usuario"]+`</span><br>`+ dato["mensaje"] +`<br><span>`+dato["fecha"][1]+`</span></p>
                                </div>`
    }
    
    // autoscroll al ultimo mensaje enviado
    mensaje.lastChild.scrollIntoView(true, { behavior: "smooth"})
})

// creacion de sala
function crearSala(){
    nombreSala = document.querySelector("#nombreSala").value
    usuario = localStorage.getItem("usuario")
    socket.emit("crearSala", {"sala":nombreSala, "usuario":usuario})
}

socket.on("salaCreada", function(dato){
    // limpiamos el input
    document.querySelector("#nombreSala").value = ""
    // listamos las salas
    listarSalas()
    // volvemos a la vista sala
    document.querySelector("#chats").checked = true
})

/* para manejo del enter en dependencia del input */

// Obtén los elementos input por su ID
var input1 = document.getElementById('nombreSala');
var input2 = document.getElementById('mensaje');

// Agrega el controlador de eventos al input donde se escribe el nombre de la sala
input1.addEventListener('keyup', function(event) {
    // si se presiona enter se ejectua la funcion
  if (event.key === 'Enter') {
    crearSala()
  }
})

// Agrega el controlador de eventos al input donde se escribe el mensaje a enviar
input2.addEventListener('keyup', function(event) {
    // si se presiona enter se ejectua la funcion
  if (event.key === 'Enter') {
    sendMenssage()
  }
})

// mensaje de que la sala o chat ya existe
socket.on("chatExiste",function(dato){
    alert("La sala que intentas crear ya existe")
})

// mensaje de nombre de chat vacio
socket.on("nombreChatVacio",function(dato){
    alert("Ingresa un nombre para la sala")
})

// mensaje de nombre de chat invalido
socket.on("nombreInvalido",function(dato){
    alert("Nombre invalido, borra los espacios")
})

// funcion para editar el nombre de usuario
function editarConfirmar(x){
    x.classList.toggle("fa-check");

    // alternamos visibilidad entre los dos elementos
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

// enviar archivo
function subirArchivo(){
    // input donde se suben las imagenes
    let imageInput = document.querySelector("#attach")
    // no se le da click directamente al input si no a un icono
    // al darle click al icono, hacemos click con JS al input
    imageInput.click()

    // validamos si tiene el listener y hacemos que solo se agregue una vez
    if (imageInput.dataset.listener !== 'true'){

    imageInput.addEventListener("change", (e) =>{
        // obtenemos el archivo
        let file = imageInput.files[0]

        // validamos que sea una imgen, tambien en el html
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona una imagen.');
            e.target.value = '';
            return
        }
        // creamos un lector
        let reader = new FileReader()
        reader.addEventListener("load",()=>{
            // obtenemos la sala
            let room = localStorage.getItem("chatActivo")
            // obtenemos el usuario
            let user = localStorage.getItem("usuario")
            // emitimos el evento con el usuario, la sala y el dato base64 de la imagen
            socket.emit("imagen", {"room":room, "usuario":user, "imagen":reader.result})
        })
        reader.readAsDataURL(file)
    })
    
    imageInput.dataset.listener = 'true'
}
}

socket.on("imagenRecibida",function(dato){
    let mensaje = document.querySelector("#chats"+dato["chat"])

    // Actualizamos el chat del chat en la lista chats (leftSide)
    const ultimoMensaje = document.querySelector("#ultimoMensaje"+dato["chat"])
    const fechaUltimoMensaje = document.querySelector("#fechaUltimoMensaje"+dato["chat"])
    //ultimoMensaje.innerHTML = dato["mensaje"]
    fechaUltimoMensaje.innerHTML = dato["fecha"][1]

    // los mensajes propios los ponemos a la derecha
    if(dato["usuario"]===localStorage.getItem("usuario")){
        mensaje.innerHTML +=    `<div class="mensaje my_mensaje">
                                    <p><span>`+dato["fecha"][1]+`</span>
                                    <img src="`+dato["mensaje"]+`" alt="" style="width: 100%; border-radius: 5px;">
                                    </p>
                                </div>`
    }
    // los de mas a la izquierda
    else{
        mensaje.innerHTML +=    `<div class="mensaje friend_mensaje">
                                    <p><span>`+dato["usuario"]+`</span><span>`+dato["fecha"][1]+`</span>
                                    <img src="`+dato["mensaje"]+`" alt="" style="width: 100%; border-radius: 5px;">
                                    </p>
                                </div>`
    }
    
    // autoscroll al ultimo mensaje enviado
    mensaje.lastChild.scrollIntoView(true, { behavior: "smooth"})
})