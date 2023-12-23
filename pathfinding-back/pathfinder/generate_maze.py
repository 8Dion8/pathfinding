import numpy as np

def generate_maze(w, h):
    return np.random.randint(0, 2, size=(w, h)).tolist()