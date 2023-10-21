# Project 2

Web Programming with Python and JavaScript

## Información del proyecto
- Titulo:  `Flack`
- Autor:  `Jerry Ronaldo Espino Inestroza`
- Descripción: Proyecto 2 de programación web. se trata de un servicio de mensajeria en linea utlizando Flask y SocketIO, dónde los usuarios serán capaces de registrarse con un nombre y luego crear canales para comunicarse, así cómo ver y unirse a canales existentes.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En estos canales los usuarios serán capaces de enviar y recibir mensajes de texto e imagenes usando el protocolo de comunicación WebSoket.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; También los usuarios podrán ser capaces de cambiar su nombre de usuario, siempre y cuándo el nuevo nombre de usuario no cree algún conflicto con otro.  

 Video: [Video de demostración en Youtube](https://youtu.be/cVQmJ8I4vWI)

## 🛠 Skills
- HTML
- CSS
- Flask
- SocketIO
- JavaScript

## Detalles del proyecto
### Requerimientos solicitados
- [x] **Nombre Visual**: Cuando un usuario visita tu aplicación web por primera vez, se le debe pedir que ingrese un nombre que eventualmente será asociado a cada mensaje que el usuario envíe. Si un usuario cierra la página y regresa a tu aplicación más tarde, el nombre aún se debe recordar.
- [x] **Creación de Canal**: Cualquier usuario debe ser capaz de crear un canal nuevo, siempre que su nombre no entre en conflicto con el nombre de un canal existente.
- [x] **Lista de Canales**: Los usuarios deben ser capaces de ver una lista de todos los canales actuales, y al seleccionar uno se debe permitir al usuario ver el canal.
- [x] **Vista de Mensajes**: Una vez que se selecciona un canal, el usuario debe ver cualquier mensaje que ya haya sido enviado en ese canal, hasta un máximo de 100 mensajes. Tu aplicación debe almacenar solamente los 100 mensajes más recientes por cada canal en la memoria del lado del servidor.
- [x] **Envío de Mensajes**: Una vez en un canal, los usuarios deben ser capaces de enviar mensajes de texto a otros en el canal. Cuando un usuario envía un mensaje, su nombre visible y la marca de tiempo del mensaje deben estar asociados con el mensaje. Todos los usuarios en el canal deben ver el nuevo mensaje (con el nombre visible y la marca de tiempo) aparecer en su página del canal. El envío y recepción de mensajes NO debería requerir volver a cargar la página.
- [x] **Recordar el Canal**: Si un usuario está en una página de canal, cierra la ventana del navegador, y regresa a tu aplicación web, tu aplicación debería recordar en qué canal estaba el usuario anteriormente y llevarlo de vuelta a ese canal
- [x] **Toque Personal**: ¡Agrega al menos una característica adicional a tu aplicación de chat! las posibilidades incluyen: eliminación de mensajes propios, envío de archivos como mensajes, o envío de mensajes privados entre dos usuarios.
- [x] **En README.md** , incluye una breve reseña describiendo tu proyecto.
- [x] Si has agregado paquetes de Python que deban ser instalados para ejecutar tu aplicación web, asegúrate de agregarlos a requirements.txt.

### Contenido de cada archivo
#### style.css
**Ruta: static/css/style.css**

En este archivo se encarga del estilado de la página para darle una mejor apariencia visual al usuario al momento de usarla, ya que se usan conceptos tales como mediaquery que permiten el acoplamiento del contenido en dependencia del tamaño de pantalla del dispositivo desde dónde se esté usando la aplicación web.

#### index.js
**Ruta: static/js/index.css**

Archivo JS que es llamado en la pagina index.html, a través de éste archivo se hacen validaciones como el ingreso de un usuario o que si ya el usuario esta logueado ser redirigido a la pagina donde se listan las salas.

También con este archivo se mandan mensajes de error al iniciar session con detalle del error para que el usuario pueda saber como resolver el problema.

#### app.js
**Ruta: static/js/app.css**

Archivo donde se maneja los eventos socket para el funcionamiento de la pagina, este arcchivo es utilizado en la página canales, la cual es dónde se muestras los chats disponibles.

En este archivo manejamos eventos de:
- cierre de sesión.
- Unirse a un chat.
- Abandonar un chat.
- Enviar mensajes en un chat.
- Enviar imagenes en un chat
- Crear un nuevo chat.
- Cambiar nombre de usuario.
- Cambiar foto de perfil

#### layout.html
**Ruta: templates/layout.html**

El archivo layout.hmtl es un archivo que sirve como plantilla base para los demás archivos html.

#### index.html
**Ruta: templates/index.html**

Página principal en la cual el usuario tiene que registrarse para poder ingresar a la página de los chats

#### canales.html
**Ruta: templates/canales.html**

Página dónde los usuarios pueden ver los canales creados y también pueden dar click en alguno para unirse para enviar y recibir mensajes e imagenes.

Desde esta pagina, tambien pueden crear nuevos canales y cambiar su nombre de usuario.

#### application.py
**Ruta: /application.py**

Archivo python en el cual se maneja la logica del backend.
Desde aqui se maneja el guardado en memoria de cada nueva sala con sus respectivos mensajes y cada nuevo usuario que se registra en el servidor.

Se estan utilizando los siguientes modulos (a parte de los obvios: FLASK y FLASKSOKETIO):
- **os**: para el manejo de archivos del sistema.
- **datetime**: para el manejo de información del tiempo, importante para mantener un registro de la hora en que se envia un mensaje.
- **base64**: para la manipulación de información en base64, en este caso se usa para obtener la información de la imagen enviada desde el cliente al servidor
- **dotenv**: para poder trabajar con el archivo que contine las variables de entorno.

Para hacer uso de algunos de estos modulos no es necesario instalar nada mas, excepto por el modulo dotenv, pero despreoucupate que ya viene incluido en el archivo requirements.txt para que se instale junto con los demas paquete para el correcto funcionamiento de la aplicación web.

### Jerarquia de direcctorio
```

|—— static
|    |—— css
|        |—— style.css
|    |—— fonts
|        |—— OpenSans-Italic-VariableFont_wdth,wght.ttf
|        |—— OpenSans-VariableFont_wdth,wght.ttf
|    |—— img
|        |—— balloon-chat.ico
|        |—— pattern.png
|        |—— profile.png
|        |—— user.png
|    |—— js
|        |—— app.js
|        |—— index.js
|    |—— uploads
|—— templates
|    |—— canales.html
|    |—— index.html
|    |—— layout.html
|—— application.py
|—— requirements.txt
```


## Instalación entorno virtual
### Crea la carpeta : 
>`py -3 -m venv .venv`   
### Activa el entorno virtual:
> `.venv\Scripts\activate`
### Instala los requerimientos: 
> `pip install -r .\requirements.txt`
## Variables de entorno:
### Asigna el valor a la variable de entorno FLASK_APP 
Crea un archivo .env y dentro de el asigna:
>`FLASK_APP="application.py"`
## Corre la aplicación web
>`flask run`

## Toque personal
### Envio de imagenes

Este proyecto tiene la capacidad de poder enviar imagenes dentro del chat, para esto se hace uso de JavaScript el cual emite un evento al que es recibido por el backend donde se procesa la información. Esto se encuentra en el archivo app.js linea 455 y el archivo application.py linea

FRONTEND:
```
function subirArchivo(){
    let imageInput = document.querySelector("#attach")
    imageInput.click()

    if (imageInput.dataset.listener !== 'true'){

    imageInput.addEventListener("change", (e) =>{
        let file = imageInput.files[0]

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona una imagen.');
            e.target.value = '';
            return
        }
        // creamos un lector
        let reader = new FileReader()
        reader.addEventListener("load",()=>{
            let room = localStorage.getItem("chatActivo")
            let user = localStorage.getItem("usuario")
            socket.emit("imagen", {"room":room, "usuario":user, "imagen":reader.result})
        })
        reader.readAsDataURL(file)
    })
    
    imageInput.dataset.listener = 'true'
}
}

socket.on("imagenRecibida",function(dato){
    let mensaje = document.querySelector("#chats"+dato["chat"])

    const ultimoMensaje = document.querySelector("#ultimoMensaje"+dato["chat"])
    const fechaUltimoMensaje = document.querySelector("#fechaUltimoMensaje"+dato["chat"])
    fechaUltimoMensaje.innerHTML = dato["fecha"][1]

    if(dato["usuario"]===localStorage.getItem("usuario")){
        mensaje.innerHTML +=    `<div class="mensaje my_mensaje">
                                    <p><span>`+dato["fecha"][1]+`</span>
                                    <img src="`+dato["mensaje"]+`" alt="" style="width: 100%; border-radius: 5px;">
                                    </p>
                                </div>`
    }
    else{
        mensaje.innerHTML +=    `<div class="mensaje friend_mensaje">
                                    <p><span>`+dato["usuario"]+`</span><span>`+dato["fecha"][1]+`</span>
                                    <img src="`+dato["mensaje"]+`" alt="" style="width: 100%; border-radius: 5px;">
                                    </p>
                                </div>`
    }
    
    mensaje.lastChild.scrollIntoView(true, { behavior: "smooth"})
})
```
BACKEND:
```
@socketio.on("imagen")
def obtenerImagen(dato):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = dato["room"]
    usuario = dato["usuario"]
    imagen = dato["imagen"]
    image_binary = b64decode(imagen.split(',')[1])
    nombre_imagen = room +  '_' + usuario + '_' + datetime.now().strftime("%d-%m-%Y%H-%M-%S")
    try:
        with open('static/uploads/' + nombre_imagen +'.png', 'wb') as image_file:
            image_file.write(image_binary)
    except Exception as e:
        print(f"Error al guardar la imagen: {str(e)}")
    mensaje = [nombre_imagen,fecha,usuario]
    if len(chats[room][1]["mensajes"]) > 99:
        chats[room][1]["mensajes"].pop(0)
    chats[room][1]["mensajes"].append(mensaje)
    emit("imagenRecibida", {"mensaje":imagen, "chat":room, "fecha":fecha, "usuario":usuario}, room=room, broadcast=True)

```
### Cambiar foto de perfil

Este proyecto tambien cuenta con la capacidad de poder poner y cambiar la foto del perfil, se logra siguiendo un poco la logica del envio de imagenes, ya que primero tenemos que emitir el evento desde el FRONTEND y procesarlo en el BACKEND.
Esto se encuentra en el archivo app.js linea 524 en adelante y en el archivo application.py linea 235 en adelante

FRONTEND:
```
window.onload = function() {
    var contenedor = document.querySelector('.configuracion');
    var texto = document.querySelector('.texto');
  
    contenedor.addEventListener('mouseover', function() {
      texto.style.opacity = '1';
    });
  
    contenedor.addEventListener('mouseout', function() {
      texto.style.opacity = '0';
    });
  };

function cambiarFoto(){
    const imagePerfil = document.querySelector("#fotoPerfil")
    imagePerfil.click()

    imagePerfil.addEventListener("change", (e) =>{
        let file = imagePerfil.files[0]

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona una imagen.');
            e.target.value = '';
            return
        }
        let reader = new FileReader()
        reader.addEventListener("load",()=>{
            let user = localStorage.getItem("usuario")
            socket.emit("fotoPerfil", {"usuario":user, "imagen":reader.result})
        })
        reader.readAsDataURL(file)
    })
    
    imagePerfil.removeEventListener
}

socket.on("fotoCambiada", function(dato){
    const imagenPerfil = document.querySelector("#fotoUsuario")
    const imagenPerfilConfiguracion = document.querySelector("#fotoUsuarioConfiguracion")
    
    imagenPerfil.setAttribute('src', dato["imagen"])
    imagenPerfilConfiguracion.setAttribute('src', dato["imagen"])
})

```

BACKEND:
```
@socketio.on("fotoPerfil")
def cambiarFoto(dato):
    usuario = dato["usuario"]
    imagen = dato["imagen"]
    image_binary = b64decode(imagen.split(',')[1])
    nombre_imagen = usuario + '_FotoPerfil'
    if(usuarios[usuario][1]["foto"]=='static/uploads/' + nombre_imagen + ".png"):
        os.remove('static/uploads/' + nombre_imagen + ".png")
    try:
        with open('static/uploads/' + nombre_imagen +'.png', 'wb') as image_file:
            image_file.write(image_binary)
    except Exception as e:
        print(f"Error al guardar la imagen: {str(e)}")
    
    usuarios[usuario][1]["foto"] = "static/uploads/"+nombre_imagen+".png"
   
    emit("fotoCambiada", {"imagen":usuarios[usuario][1]["foto"]})

```

Como al enviar imagenes y al subir imagenes, estas mismas se estan guardando en el servidor, se nos presenta un problema, que cada vez se va llenando la memoria, para corregir esto lo que estoy haciendo es borrar todas las imagenes al comenzar la operacion de servicio del servidor. 

Esto lo pueden ver el archivo applicatio.py linea 23 y 24

```
for imagenesSubidas in os.listdir('static/uploads/'):
    os.remove('static/uploads/' + imagenesSubidas)
```

### Cambiar nombre de usuario

Este proyecto tambien cuenta con la capacidad de poder cambiar el nombre de usuario, se logra siguiendo un poco la logica anterior, ya que primero tenemos que emitir el evento desde el FRONTEND y procesarlo en el BACKEND.
Esto se puede encontrar en el archivo app.js de la linea 397  a la 446 y en application.py de la linea 185 a la 226.

FRONTEND:
```
// funcion para editar el nombre de usuario
function editarConfirmar(x){
    x.classList.toggle("fa-check");

    if(usuarioDefault.style.visibility === "visible"){
        usuarioDefault.style.visibility = "hidden"
        nombreUsuario.style.visibility = "visible"
    }
    else{
        usuarioDefault.style.visibility = "visible"
        nombreUsuario.style.visibility = "hidden"
        if (nombreUsuario.value !== usuarioDefault.innerHTML){
            socket.emit("cambiarNombreUsuario",{"nuevoUsuario":nombreUsuario.value,"anteriorUsuario":usuario})
        }
    }
    nombreUsuario.value = usuarioDefault.innerHTML
    nombreUsuario.focus()
    
}

socket.on("usuarioEditado", function(dato){
    usuarioDefault.innerHTML=dato["usuario"]
    localStorage.usuario = dato["usuario"]
    usuario = localStorage.getItem("usuario")
    if (localStorage.getItem("chatActivo")){
        socket.emit("notificarCambiousuario",{"mensaje":dato["mensaje"],"fecha":dato["fecha"], "sala":localStorage.getItem("chatActivo")})
    }
})

socket.on("usarioCambio", function(dato){
    var mensaje = document.querySelector("#chats"+localStorage.getItem("chatActivo"));
    // añadimos el mensaje de bienvenida
    mensaje.innerHTML +=    `<div class="log">
                                <p>`+ dato["mensaje"] +`<br><span>`+dato["fecha"][1]+`</span></p>
                            </div>`
    mensaje.style.display = "block"

    mensaje.lastChild.scrollIntoView(false)
})

```
BACKEND:
```
@socketio.on("cambiarNombreUsuario")
def cambiarNombreUsuario(dato):
    global usuarios
    usuarioNuevo = dato["nuevoUsuario"]
    usuarioAnterior = dato["anteriorUsuario"]
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    if usuarioNuevo.isspace() or len(usuarioNuevo) ==0:
        mensaje = "Usuario invalido"
        emit('mensaje', {"mensaje":mensaje})
        return
    elif usuarioNuevo in usuarios:
        mensaje = "Elija otro usuario"
        emit('mensaje', {"mensaje":mensaje})
        return
    for chat in chats:
        for mensaje in chats[chat][1]["mensajes"]:
            if mensaje[2] == usuarioAnterior:
                mensaje[2] = usuarioNuevo
        for usuario in chats[chat][2]["usuarios"]:
            if (usuario == usuarioAnterior):
                chats[chat][2]["usuarios"][chats[chat][2]["usuarios"].index(usuarioAnterior) ] = usuarioNuevo
    usuarios[usuarioAnterior][0]["nombre"] = usuarioNuevo
    valor = usuarios[usuarioAnterior]
    del usuarios[usuarioAnterior]
    usuarios[usuarioNuevo] = valor
    mensaje = "El usuario: "+ usuarioAnterior + " ha cambiado a: " + usuarioNuevo
    emit("usuarioEditado", {"usuario":usuarioNuevo, "fecha":fecha, "mensaje":mensaje})

@socketio.on("notificarCambiousuario")
def cambioDeUsuario(dato):
    emit("usarioCambio", {'mensaje': dato["mensaje"], "fecha":dato["fecha"]}, to=dato["sala"])

```
Como se puede observar cuando un usuario cambia su nombre y esta dentro de una sala, este cambio es notificado en esa sala.