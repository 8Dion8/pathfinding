import numpy as np
from copy import deepcopy

def get_neighbors(x, y, w, h):
    neighbors = []

    if x - 1 >= 0:
        neighbors.append((x - 1, y))
    if x + 1 < w:
        neighbors.append((x + 1, y))
    if y - 1 >= 0:
        neighbors.append((x, y - 1))
    if y + 1 < h:
        neighbors.append((x, y + 1))

    return neighbors

def djikstra(grid):
    grid = np.array(grid)
    dirs = np.zeros_like(grid).tolist()
    dists = np.full_like(grid, 9999999999999)
    current = tuple(np.where(grid == 2)[0].base[0])
    dists[*current] = 0
    neighbors = []
    frontier = []
                
def breadth_first(grid):
    grid = np.array(grid)
    anim = grid.copy()
    current = tuple(np.where(grid == 2)[0].base[0])
    frontier = [current]
    visited = []
    pointers = np.zeros_like(grid, dtype=tuple)
    keyframes = []

    frontier_left_in_keyframe = 0

    while len(frontier):
        current = frontier.pop(0)

        anim[*current] = 4 if grid[*current] != 1 else 1
        for i in frontier:
                anim[*i] = 7 if grid[*i] != 1 else 1

        


        if current in visited or grid[*current] == 1:
            continue

        if grid[*current] == 3:
            anim = grid.copy()
            while grid[*current] != 2:
                anim[*current] = 6
                current = pointers[*current]
                keyframes.append(anim.tolist())
            return keyframes
        
        neighbors = get_neighbors(*current, *grid.shape)

        for cell in neighbors:
            pointers[*cell] = deepcopy(current) if not pointers[*cell] else pointers[*cell]

        visited.append(current)
        frontier.extend(neighbors)

        if frontier_left_in_keyframe:
            frontier_left_in_keyframe -= 1
        else:
            keyframes.append(anim.tolist())
            frontier_left_in_keyframe = len(frontier)
