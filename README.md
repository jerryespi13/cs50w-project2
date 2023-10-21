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
