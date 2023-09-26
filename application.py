import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# para trabajar con variables de entorno desde el archivo .
from dotenv import load_dotenv

# carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, cors_allowed_origin="*")


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/canales')
def canales():
    return render_template("canales.html")

@socketio.on("saludo")
def saludar(dato):
    print(dato["nombre"])
    emit("saludoRecibido", {"mensaje": dato["mensaje"], "nombre":dato["nombre"]}, broadcast=True, include_self=False)