import os
from flask import Flask, render_template, redirect, request, flash
from flask_socketio import SocketIO, emit

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

@app.route("/", methods=["GET", "POST"])
def index():
    print(usuarios)
    if request.method == "GET":
        return render_template("index.html")
    else:
        usuario = request.form.get("usuario")
        print(usuario)
        if usuario == "" or usuario == " ":
            flash("Usuario invalido")
            return redirect("/")
        if usuario in usuarios:
            flash('Usuario ya existe')
            return redirect("/")
        else:
            usuarios.append(usuario)
            return redirect("/canales")

@app.route('/canales')
def canales():
    return render_template("canales.html")

@socketio.on("saludo")
def saludar(dato):
    print(dato["nombre"])
    emit("saludoRecibido", {"mensaje": dato["mensaje"], "nombre":dato["nombre"]}, broadcast=True, include_self=False)