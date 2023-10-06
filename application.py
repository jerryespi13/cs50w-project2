import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

# para manejo de tiempo
from datetime import datetime

# para trabajar con variables de entorno desde el archivo .
from dotenv import load_dotenv

# carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
socketio = SocketIO(app, cors_allowed_origin="*")

# variable donde se guardan los usuarios
usuarios=list()

# variable donde se guardan las salas
chats = dict()

fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")

# chat por defecto
chats['general'] = [
                    {"nombre_sala": "General"},
                    {"mensajes":  [["Bienvenido al chat general",fecha]]},
                    #{"usuarios": []},
                    {"numero_mensajes":""},
                    {"creada":[]}
                    ]

chats['jerry'] = [
                    {"nombre_sala": "Jerry"},
                    {"mensajes":  [["Bienvenido al chat Jerry",fecha]]},
                    #{"usuarios": []},
                    {"numero_mensajes":""},
                    {"creada":[]}
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
    usuarios.append(usuario)
    emit("usuarioConectado", {"usuario": usuario})

@socketio.on("crearSala")
def crearSala(dato):
    sala = dato["sala"]
    usuario = dato["usuario"]
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    chats[sala] = [
                    {"nombre_sala": sala},
                    {"mensajes":  []},
                    {"usuarios": []},
                    {"numero_mensajes":""},
                    {"creada":[f"Sala {sala} creada el {fecha[0]} {fecha[1]} por {usuario}"]}
                    ]
    numero_mensajes = len(chats[sala][1]["mensajes"])
    chats[sala][3]["numero_mensajes"] = numero_mensajes
    print(chats[sala][3])
    print(chats[sala])
    emit("salaCreada",{"sala":sala}, broadcast=True)

@socketio.on('join')
def on_join(data):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = data['room']
    usuario = data["usuario"]
    join_room(room)
    emit("chatConectado", {'msg': usuario + ' ha ingresado a la sala', "chat":room, "fecha":fecha}, to=room)

@socketio.on('leave')
def on_leave(data):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    usuario = data["usuario"]
    room = data['room']
    leave_room(room)
    emit('chatDesconectado', {'msg': usuario + ' ha abandonado la sala', 'chat':room, "fecha":fecha}, room=room)

@socketio.on("saludo")
def saludar(dato):
    print(dato["nombre"])
    emit("saludoRecibido", {"mensaje": dato["mensaje"], "nombre":dato["nombre"]}, broadcast=True, include_self=False)

# listamos cada chat existente
@socketio.on("get_room_list")
def send_room_list(dato):
    rooms=list()
    for chat in chats:
        #cantidad de chats en el chat
        chats[chat][3]=len(chats[chat][1]["mensajes"])
        rooms.append(chats[chat])
    emit("room_list", {"rooms":rooms})

# cerrar sesion
@socketio.on("cerrarSesion")
def cerrarSesion(dato):
    global usuarios
    # borramos el usuario en cuestion
    emit("sesionCerrada",{"mensaje":"sesion cerrada"})
    usuarios.remove(dato["usuario"])

@socketio.on("mensaje")
def obtener_mensaje(dato):
    fecha = datetime.now().strftime("%d-%m-%Y %H:%M").split(" ")
    room = dato["sala"]
    message = dato["mensaje"]
    usuario = dato["usuario"]
    emit("mensajeRecibido", {"mensaje":message, "chat":room, "fecha":fecha, "usuario":usuario}, room=room, broadcast=True)