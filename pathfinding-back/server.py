from flask import Flask, request
from flask_cors import CORS
from pathfinder.generate_maze import generate_maze

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return "Hello, world!"

@app.route("/ping")
def ping():
    return {"ping": "pong"}

@app.route("/maze")
def maze():
    width = int(request.args.get("width"))
    height = int(request.args.get("height"))
    maze_data, keyframes = generate_maze(height, width)
    return {"data": maze_data, "keyframes": keyframes}