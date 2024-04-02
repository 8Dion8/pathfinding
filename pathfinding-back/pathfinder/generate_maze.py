import numpy as np
import random
from copy import deepcopy

def get_neighbors(x, y, w, h):
    neighbors = []

    if x - 1 >= 1:
        neighbors.append((x - 1, y))
    if x + 1 < w-1:
        neighbors.append((x + 1, y))
    if y - 1 >= 1:
        neighbors.append((x, y - 1))
    if y + 1 < h-1:
        neighbors.append((x, y + 1))

    return neighbors

def backtrack(maze, current, visited, w, h, keyframes):
    visited.append(current)
    keyframes.append(deepcopy(maze))

    neighbors = get_neighbors(*current, w, h)
    random.shuffle(neighbors)

    for edge in neighbors:
        diffx = edge[0] - current[0]
        diffy = edge[1] - current[1]
        cell = (edge[0] + diffx, edge[1] + diffy)
        if cell not in visited:
            maze[edge[0]][edge[1]] = 0
            backtrack(maze, cell, visited, w, h, keyframes)


def generate_maze(w, h):
    keyframes = []

    maze = np.zeros((w, h), int).tolist()

    for i in range(0, w, 2):
        for j in range(h):
            maze[i][j] = 1

    for j in range(0, h, 2):
        for i in range(w):
            maze[i][j] = 1
    visited = []
    backtrack(maze, (1, 1), visited, w, h, keyframes)

    maze[0][1] = 2
    maze[w-1][h-2] = 3

    keyframes.append(maze)

    return maze, keyframes


if __name__ == "__main__":
    pass
