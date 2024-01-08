import numpy as np
import random
from copy import deepcopy
import json

def get_neighbors(x, y, w, h, exclude_edges=False):
    neighbors = []

    if exclude_edges:
        edges = (1, 1, w-1, h-1)
    else:
        edges = (0, 0, w, h)
    if x - 1 >= edges[0]:
        neighbors.append((x - 1, y))
    if x + 1 < edges[2]:
        neighbors.append((x + 1, y))
    if y - 1 >= edges[1]:
        neighbors.append((x, y - 1))
    if y + 1 < edges[3]:
        neighbors.append((x, y + 1))

    return neighbors

def backtrack(maze, current, visited, w, h, keyframes):
    visited.append(current)
    keyframes.append(deepcopy(maze))

    neighbors = get_neighbors(*current, w, h, exclude_edges=True)
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


def djikstra(grid):
    grid = np.array(grid)
    dirs = np.zeros_like(grid).tolist()
    dists = np.full_like(grid, 9999999999999)
    current = tuple(np.where(grid == 2)[0].base[0])
    dists[*current] = 0
    neighbors = []
    frontier = []
    while True:
        neighbors = get_neighbors(*current, *grid.shape)
        frontier.extend(neighbors)
        for cell in frontier:
            val = grid[*cell]
            if val != 1 and dists[*cell] > dists[*current]:
                #grid[*neighbor] = 2
                dirs[cell[0]][cell[1]] = current
                dists[*cell] = dists[*current] + 1

            
        
        current = frontier.pop(0)
                
def breadth_first(grid):
    grid = np.array(grid)
    anim = grid.copy()
    current = tuple(np.where(grid == 2)[0].base[0])
    frontier = [current]
    visited = []
    pointers = np.zeros_like(grid, dtype=tuple)
    keyframes = []

    while len(frontier):
        current = frontier.pop(0)

        anim[*current] = 4 if grid[*current] != 1 else 1
        for i in frontier:
                anim[*i] = 6 if grid[*i] != 1 else 1
        keyframes.append(anim.tolist())


        if current in visited or grid[*current] == 1:
            continue

        if grid[*current] == 3:
            anim = grid.copy()
            while grid[*current] != 2:
                anim[*current] = 5
                current = pointers[*current]
                keyframes.append(anim.tolist())
            return keyframes
        
        neighbors = get_neighbors(*current, *grid.shape)

        for cell in neighbors:
            pointers[*cell] = deepcopy(current) if not pointers[*cell] else pointers[*cell]

        visited.append(current)
        frontier.extend(neighbors)






if __name__ == "__main__":
    print(
        breadth_first([[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,4,1,0,0,0,1,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,1,0,0,0,1],[1,4,1,1,1,0,1,0,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,4,1,0,1,1,1,0,1,0,1,1,1],[1,4,4,4,1,0,0,0,0,0,1,4,1,0,0,0,0,0,1,4,4,4,1,4,1,0,1,0,0,0,1,0,0,0,1],[1,1,1,4,1,0,1,1,1,1,1,4,1,0,1,1,1,1,1,4,1,4,1,4,1,0,1,0,1,1,1,0,1,0,1],[1,4,4,4,1,0,0,0,1,4,4,4,1,4,4,4,4,4,4,4,1,4,4,4,1,0,1,0,0,0,1,0,1,0,1],[1,4,1,1,1,1,1,0,1,4,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],[1,4,1,0,0,0,0,0,1,4,4,4,1,4,4,4,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],[1,4,1,1,1,0,1,1,1,1,1,4,1,1,1,4,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1],[1,4,4,4,1,0,1,4,4,4,4,4,1,4,4,4,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1],[1,1,1,4,1,0,1,4,1,1,1,1,1,4,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,4,1,0,1,4,1,4,4,4,1,4,4,4,4,4,4,4,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1],[1,0,1,4,1,0,1,4,1,4,1,4,1,1,1,1,1,1,1,4,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1],[1,0,1,4,1,0,1,4,1,4,1,4,1,0,0,0,0,0,1,4,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],[1,0,1,4,1,0,1,4,1,4,1,4,1,1,1,1,1,0,1,4,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],[1,4,4,4,1,0,1,4,1,4,1,4,1,4,4,4,1,0,0,4,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],[1,4,1,1,1,1,1,4,1,4,1,4,1,4,1,4,1,1,1,4,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],[1,4,1,4,4,4,1,4,1,4,1,4,4,4,1,4,4,4,1,4,4,4,1,0,0,0,0,0,1,0,1,0,0,0,1],[1,4,1,4,1,4,1,4,1,4,1,1,1,1,1,1,1,4,1,1,1,4,1,1,1,1,1,0,1,1,1,1,1,0,1],[1,4,4,4,1,4,1,4,4,4,1,4,4,4,4,4,1,4,4,4,1,4,4,4,4,4,1,0,0,0,0,0,1,0,1],[1,1,1,1,1,4,1,1,1,1,1,4,1,1,1,4,1,1,1,4,1,1,1,1,1,4,1,0,1,1,1,0,1,1,1],[1,0,0,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,1,4,4,4,1,4,4,4,1,0,0,0,1,0,0,0,1],[1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,4,1,1,1,4,1,4,1,1,1,1,1,1,1,1,1,0,1],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1]])
    )

    '''
    print(
        breadth_first([
            [1, 2, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 3, 1, 1, 1, 1, 1],
        ])
    )
    '''