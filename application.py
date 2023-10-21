import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

# para manejo de tiempo
from datetime import datetime

# para trabajar con datos en base64
from base64 import b64decode

# para trabajar con variables de entorno desde el archivo .
from dotenv import load_dotenv

# carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
socketio = SocketIO(app, cors_allowed_origin="*")

# borramos todas las imagenes subidas anteriormente
for imagenesSubidas in os.listdir('static/uploads/'):
    os.remove('static/uploads/' + imagenesSubidas)

# variable donde se guardan los usuarios
usuarios=dict()

# variable donde se guardan las salas
chats = dict()

# chat por defecto
chats['general'] = [
                    {"nombre_sala": "general"},
                    {"mensajes":  []},
                    {"usuarios": []},
                    {"creada": "Sala creada por defecto"}
                    ]

# ruta index
@app.route("/")
def index():
    return render_template("index.html")

# ruta de los chats
@app.route('/canales')
def canales():
    return render_template("canales.html")

# verificamos si el usuario guardado en local storage existe en la lista usuarios
# si existe, se conecta automaticamente sin pedir usuario en la vista
@socketio.on("existeUsuario")
def persistenciaUsuario(dato):
    if dato["usuario"] in usuarios:
        emit("usuarioConectado",{"mensaje":"usuario existe","usuario":dato["usuario"]})

# coneccion de un usuario
@socketio.on("conectarUsuario")
def conectarUsuario(dato):
    global usuarios
    usuario = dato["usuario"]
    # validamos que el usuario no venga vacio
    if usuario.isspace() or len(usuario) ==0:
        mensaje = "Usuario invalido"
        emit('mensaje', {"mensaje":mensaje})
        return
    # validamos que el usuario no exista
    elif usuario in usuarios:
        mensaje = "Elija otro usuario"
        emit('mensaje', {"mensaje":mensaje})
        return
    
    # si pasa la validacion agregamos ese usuario a lista de usuarios
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    usuarios[usuario] = [
                        {"nombre": usuario},
                        {"foto": "/static/img/user.png"},
                        {"fechaCreacion": fecha}
                        ]
    emit("usuarioConectado", {"usuario": usuario})

# crear nueva sala
@socketio.on("crearSala")
def crearSala(dato):
    sala = dato["sala"]
    # validamos que se haya escrito un nombre para la sala
    if sala.isspace() or len(sala) ==0:
        emit("nombreChatVacio",{"chat":sala})
        return
    # validamos que el nombre de la sala no tenga espacios
    elif " " in sala:
        emit("nombreInvalido",{"chat":sala})
        return
    # validamos que la sala no exista
    elif sala in chats:
        emit("chatExiste",{"chat":sala})
        return
    usuario = dato["usuario"]
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    chats[sala] = [
                    {"nombre_sala": sala},
                    {"mensajes":  []},
                    {"usuarios": []},
                    {"creada": f"Sala {sala} creada el {fecha[0]} {fecha[1]} por {usuario}"}
                    ]
    emit("salaCreada",{"sala":sala}, broadcast=True)

# unirse a una sala
@socketio.on('join')
def on_join(data):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = data['room']
    usuario = data["usuario"]
    chats[room][2]["usuarios"].append(usuario)
    mensajes = chats[room][1]["mensajes"]
    join_room(room)
    emit("chatConectado", {'msg': usuario + ' ha ingresado a la sala', "chat":room, "fecha":fecha, "mensajes":mensajes}, to=room)

# dejar una sala
@socketio.on('leave')
def on_leave(data):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    usuario = data["usuario"]
    room = data['room']
    chats[room][2]["usuarios"].remove(usuario)
    leave_room(room)
    emit('chatDesconectado', {'msg': usuario + ' ha abandonado la sala', 'chat':room, "fecha":fecha}, room=room)

# listamos cada chat existente
@socketio.on("get_room_list")
def send_room_list(dato):
    rooms=list()
    for chat in chats:
        rooms.append(chats[chat])
    emit("room_list", {"rooms":rooms})

# cerrar sesion
@socketio.on("cerrarSesion")
def cerrarSesion(dato):
    global usuarios
    # borramos el usuario en cuestion
    emit("sesionCerrada",{"mensaje":"sesion cerrada"})
    del usuarios[dato["usuario"]]

# envio de mensajes
@socketio.on("mensaje")
def obtener_mensaje(dato):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = dato["sala"]
    message = dato["mensaje"]
    usuario = dato["usuario"]
    mensaje = [message, fecha, usuario]
    # nos aseguramos que el chat solo guarde 100 mensajes
    if len(chats[room][1]["mensajes"]) > 99:
        chats[room][1]["mensajes"].pop(0)
    chats[room][1]["mensajes"].append(mensaje)
    emit("mensajeRecibido", {"mensaje":message, "chat":room, "fecha":fecha, "usuario":usuario}, room=room, broadcast=True)

# envio de imagen
@socketio.on("imagen")
def obtenerImagen(dato):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = dato["room"]
    usuario = dato["usuario"]
    # obtenemos la imagen
    imagen = dato["imagen"]
    # obtenemos el binario de la imagen
    image_binary = b64decode(imagen.split(',')[1])
    # creamos un nombre para la imagen
    nombre_imagen = room +  '_' + usuario + '_' + datetime.now().strftime("%d-%m-%Y%H-%M-%S")
    # guardamos la imagen en la carpeta uploads
    try:
        with open('static/uploads/' + nombre_imagen +'.png', 'wb') as image_file:
            image_file.write(image_binary)
    except Exception as e:
        print(f"Error al guardar la imagen: {str(e)}")
    mensaje = [nombre_imagen,fecha,usuario]
    # nos aseguramos que el chat solo guarde 100 mensajes
    if len(chats[room][1]["mensajes"]) > 99:
        chats[room][1]["mensajes"].pop(0)
    chats[room][1]["mensajes"].append(mensaje)
    emit("imagenRecibida", {"mensaje":imagen, "chat":room, "fecha":fecha, "usuario":usuario}, room=room, broadcast=True)

# editar nombre usuario
@socketio.on("cambiarNombreUsuario")
def cambiarNombreUsuario(dato):
    global usuarios
    usuarioNuevo = dato["nuevoUsuario"]
    usuarioAnterior = dato["anteriorUsuario"]
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    # validamos que el usuario no venga vacio
    if usuarioNuevo.isspace() or len(usuarioNuevo) ==0:
        mensaje = "Usuario invalido"
        emit('mensaje', {"mensaje":mensaje})
        return
    # validamos que el usuario no exista
    elif usuarioNuevo in usuarios:
        mensaje = "Elija otro usuario"
        emit('mensaje', {"mensaje":mensaje})
        return
    # actualizamos los mensajes asocidados al usuario
    for chat in chats:
        for mensaje in chats[chat][1]["mensajes"]:
            if mensaje[2] == usuarioAnterior:
                mensaje[2] = usuarioNuevo
    # actulizamos el usuario
    usuarios[usuarioAnterior][0]["nombre"] = usuarioNuevo
    # cambiamos la clave en el diccionario
    # para eso primero obtenemos los datos ya actualizados de la key vieja
    valor = usuarios[usuarioAnterior]
    # eliminamos la key vieja
    del usuarios[usuarioAnterior]
    # creamos una key nueva con los valores ya editados
    usuarios[usuarioNuevo] = valor
    # mensaje de cambio de usuario para la sala
    mensaje = "El usuario: "+ usuarioAnterior + " ha cambiado a: " + usuarioNuevo
    emit("usuarioEditado", {"usuario":usuarioNuevo, "fecha":fecha, "mensaje":mensaje})

@socketio.on("notificarCambiousuario")
def cambioDeUsuario(dato):
    emit("usarioCambio", {'mensaje': dato["mensaje"], "fecha":dato["fecha"]}, to=dato["sala"])

@socketio.on("fotoUsuario")
def fotoUsuario(dato):
    usuario = dato["usuario"]
    imagen =usuarios[usuario][1]["foto"]
    emit("imagenUsuario", {"imagen":imagen})

# Cambio de foto de perfil
@socketio.on("fotoPerfil")
def cambiarFoto(dato):
    usuario = dato["usuario"]
    # obtenemos la imagen
    imagen = dato["imagen"]
    # obtenemos el binario de la imagen
    image_binary = b64decode(imagen.split(',')[1])
    # creamos un nombre para la imagen
    nombre_imagen = usuario + '_FotoPerfil'
    # si existe una imagen en la carpeta uplodas la borramos
    if(usuarios[usuario][1]["foto"]=='static/uploads/' + nombre_imagen + ".png"):
        os.remove('static/uploads/' + nombre_imagen + ".png")
    # guardamos la imagen en la carpeta uploads
    try:
        with open('static/uploads/' + nombre_imagen +'.png', 'wb') as image_file:
            image_file.write(image_binary)
    except Exception as e:
        print(f"Error al guardar la imagen: {str(e)}")
    
    # actulizar imagen en memoria
    usuarios[usuario][1]["foto"] = "static/uploads/"+nombre_imagen+".png"
   
    emit("fotoCambiada", {"imagen":usuarios[usuario][1]["foto"]})
