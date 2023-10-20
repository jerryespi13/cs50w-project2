# Project 2

Web Programming with Python and JavaScript

## Información del proyecto
- Titulo:  `Flack`
- Autor:  `Jerry Ronaldo Espino Inestroza`
- Descripción: Proyecto 2 de programación web. se trata de un servicio de mensajeria en linea utlizando Flask, dónde los usuarios serán capaces de registrarse con un nombre para crear canales para comunicarse, así cómo ver y unirse a canales existentes.
<!--- Video: [video]()-->

## 🛠 Skills
- HTML
- CSS
- Flask
- Socketio
- Javascript

## Detalles del proyecto
### Requerimientos solicitados
- [x] Nombre Visual: Cuando un usuario visita tu aplicación web por primera vez, se le debe pedir que ingrese un nombre que eventualmente será asociado a cada mensaje que el usuario envíe. Si un usuario cierra la página y regresa a tu aplicación más tarde, el nombre aún se debe recordar.
- [x] Creación de Canal: Cualquier usuario debe ser capaz de crear un canal nuevo, siempre que su nombre no entre en conflicto con el nombre de un canal existente.
- [x] Lista de Canales: Los usuarios deben ser capaces de ver una lista de todos los canales actuales, y al seleccionar uno se debe permitir al usuario ver el canal.
Vista de Mensajes: Una vez que se selecciona un canal, el usuario debe ver cualquier mensaje que ya haya sido enviado en ese canal, hasta un máximo de 100 mensajes. Tu aplicación debe almacenar solamente los 100 mensajes más recientes por cada canal en la memoria del lado del servidor.
- [x] Envío de Mensajes: Una vez en un canal, los usuarios deben ser capaces de enviar mensajes de texto a otros en el canal. Cuando un usuario envía un mensaje, su nombre visible y la marca de tiempo del mensaje deben estar asociados con el mensaje. Todos los usuarios en el canal deben ver el nuevo mensaje (con el nombre visible y la marca de tiempo) aparecer en su página del canal. El envío y recepción de mensajes NO debería requerir volver a cargar la página.
- [x] Recordar el Canal: Si un usuario está en una página de canal, cierra la ventana del navegador, y regresa a tu aplicación web, tu aplicación debería recordar en qué canal estaba el usuario anteriormente y llevarlo de vuelta a ese canal
- [x] Toque Personal: ¡Agrega al menos una característica adicional a tu aplicación de chat! las posibilidades incluyen: eliminación de mensajes propios, envío de archivos como mensajes, o envío de mensajes privados entre dos usuarios.
- [x] En README.md , incluye una breve reseña describiendo tu proyecto.
- [x] Si has agregado paquetes de Python que deban ser instalados para ejecutar tu aplicación web, asegúrate de agregarlos a requirements.txt.

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