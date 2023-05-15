import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Node } from 'src/app/model/node';
import { Speed } from 'src/app/model/speed';
import { PathfindingService } from 'src/app/service/pathfinding.service';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.scss'],
})
export class PathfindingComponent implements OnInit {

  constructor(private pf: PathfindingService) { }

  // getting current screen size
  // @HostListener('window:resize', ['$event'])
  // getScreenSize() {
  //   const screenHeight = window.innerHeight;
  //   const screenWidth = window.innerWidth;

  //   const gridWidth = screenWidth;
  //   const gridHight = screenHeight * 0.9;

  //   this.TOTAL_ROW = Math.round(gridHight / 25);
  //   this.TOTAL_COL = Math.round(gridWidth / 25);

  //   this.createGrid();
  // }

  // speedOptions = [Speed.SLOW, Speed.MEDIUM, Speed.FAST];

  TOTAL_ROW = 27;
  TOTAL_COL = 63;

  START_ROW = 5;
  START_COL = 5;

  FINISH_ROW = 15;
  FINISH_COL = 40;

  grid: Node[][] = [];

  isMousePressed = false;

  ngOnInit() {
    this.createGrid();
  }

  reset() {
    this.createGrid();
  }

  visualize() {
    const startNode = this.grid[this.START_ROW][this.START_COL];
    const finishNode = this.grid[this.FINISH_ROW][this.FINISH_COL];

    const visitedNodesInOrder = this.pf.dijkstra(this.grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.pf.getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  createGrid() {
    this.grid = [];
    for (let i = 0; i < this.TOTAL_ROW; i++) {
      let rowNode = [];
      for (let j = 0; j < this.TOTAL_COL; j++) {
        if (i === this.START_ROW && j === this.START_COL) {
          rowNode.push(new Node(i, j, true, false));
        } else if (i === this.FINISH_ROW && j === this.FINISH_COL) {
          rowNode.push(new Node(i, j, false, true));
        } else {
          rowNode.push(new Node(i, j));
        }
      }
      this.grid.push(rowNode);
    }
  }

  onMouseUp(node: Node) {
    this.isMousePressed = false;
  }
  onMouseDown(node: Node) {
    this.isMousePressed = true;
    if (node.isStart || node.isFinish) {

    } else this.grid = this.getNewGridWithWallToggled(this.grid, node);
  }
  onMouseEnter(node: Node) {
    if (this.isMousePressed === true) {
      this.grid = this.getNewGridWithWallToggled(this.grid, node);
    }
  }

  getNewGridWithWallToggled(grid: Node[][], node: Node) {

    const newGrid = grid.slice();

    newGrid[node.x][node.y].isWall = !node.isWall;

    return newGrid;
  }

  animate(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, Speed.FAST * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        let el: Element = document.getElementById(`node-${node.x}-${node.y}`) || new Element;
        el.className =
          'node node-visited';
      }, Speed.FAST * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: Node[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        let el: Element = document.getElementById(`node-${node.x}-${node.y}`) || new Element;
        el.className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
}
