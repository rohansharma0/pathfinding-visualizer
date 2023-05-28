import { Injectable } from '@angular/core';
import { Node } from '../model/node';

@Injectable({
  providedIn: 'root'
})
export class PathfindingService {

  // Depth First Search
  depthFisrtSearch(grid: Node[][], startNode: Node, finishNode: Node) {

    let visitedNodesInOrder: Node[] = [];

    let queue: Node[] = [];
    grid[startNode.x][startNode.y].isVisited = true;

    queue.push(startNode);

    while (queue.length > 0) {

      const node: Node = queue[0];

      if (node.isWall) continue;

      visitedNodesInOrder.push(node);

      if (node === finishNode) return visitedNodesInOrder;

      console.log(node);

      queue.shift();

      const neighbors = this.getUnvisitedNeighbors(node, grid);

      for (const neighbor of neighbors) {
        grid[neighbor.x][neighbor.y].isVisited = true;
        queue.push(neighbor);
      };

    }

    return visitedNodesInOrder;
  }

  private dfs(grid: Node[][], startNode: Node, finishNode: Node, visitedNodesInOrder: Node[]) {

    if (startNode.isVisited || startNode.isWall || startNode.isFinish) return;

    visitedNodesInOrder.push(startNode);

    const { x, y } = startNode;
    console.log(grid[x][y]);


    grid[x][y].isVisited = true;

    if (x - 1 >= 0) this.dfs(grid, grid[x - 1][y], finishNode, visitedNodesInOrder);

    if (y + 1 < grid[x].length) this.dfs(grid, grid[x][y + 1], finishNode, visitedNodesInOrder);

    if (x + 1 < grid.length) this.dfs(grid, grid[x + 1][y], finishNode, visitedNodesInOrder);

    if (y - 1 >= 0) this.dfs(grid, grid[x][y - 1], finishNode, visitedNodesInOrder);

  }

  // Dijkstra Algorithm 
  dijkstra(grid: Node[][], startNode: Node, finishNode: Node) {

    let visitedNodesInOrder: Node[] = [];

    startNode.distance = 0;
    const unvisitedNodes = this.getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
      this.sortNodesByDistance(unvisitedNodes);

      const closestNode = unvisitedNodes.shift();
      if (closestNode) {

        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;


        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        this.updateUnvisitedNeighbors(closestNode, grid);
      }
    }
    return visitedNodesInOrder;
  }

  private sortNodesByDistance(unvisitedNodes: Node[]) {
    unvisitedNodes.sort((nodeA: Node, nodeB: Node) => nodeA.distance - nodeB.distance);
  }

  private updateUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }

  //getting all 4 side neighbors which are not visited
  private getUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const neighbors = [];
    const { x, y } = node;
    if (x - 1 >= 0) neighbors.push(grid[x - 1][y]);
    if (y + 1 < grid[x].length) neighbors.push(grid[x][y + 1]);
    if (x + 1 < grid.length) neighbors.push(grid[x + 1][y]);
    if (y - 1 >= 0) neighbors.push(grid[x][y - 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  //getting all nodes from the 2D Grid to 1D Array
  private getAllNodes(grid: Node[][]) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  getNodesInShortestPathOrder(finishNode: Node) {
    const nodesInShortestPathOrder: Node[] = [];
    let currentNode = finishNode;
    while (currentNode.previousNode !== undefined) {
      nodesInShortestPathOrder.push(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
}
