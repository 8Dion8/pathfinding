from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return "Hello, world!"

@app.route("/ping")
def ping():
    return {"ping": "pong"}