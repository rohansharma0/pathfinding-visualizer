import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Algorithm } from 'src/app/model/algorithm';
import { Node } from 'src/app/model/node';
import { PathfindingService } from 'src/app/service/pathfinding.service';
import { ALGORITHM, SPEED } from 'src/app/utils/constants';

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

  TOTAL_ROW = 20;
  TOTAL_COL = 45;

  INIT_START_ROW = 5;
  INIT_START_COL = 5;

  START_ROW = this.INIT_START_ROW;
  START_COL = this.INIT_START_COL;

  INIT_FINISH_ROW = 15;
  INIT_FINISH_COL = 40;

  FINISH_ROW = this.INIT_FINISH_ROW;
  FINISH_COL = this.INIT_FINISH_COL;

  grid: Node[][] = [];

  algorithms = ALGORITHM;
  selectedAlgorithm!: Algorithm;

  speeds = SPEED;
  selectedSpeed: number = this.speeds[1].value;

  isEmptyNodePressed: boolean = true;

  isMousePressed: boolean = false;
  mouseDownPressedNode!: Node;


  ngOnInit() {
    this.createGrid();
  }

  getAlgorithm(event: any) {
    this.selectedAlgorithm = Number(event.target.value);
  }

  getSpeed(event: any) {
    this.selectedSpeed = Number(event.target.value);
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
    // switch (this.selectedAlgorithm) {
    //   case Algorithm.Dijkstra:

    //     break;
    //   case Algorithm.BreadthFirstSearch:
    //     break;
    //   case Algorithm.DepthFirstSearch:
    //     break;
    //   default:
    //     break;
    // }
  }

  createGrid() {
    this.grid = [];
    for (let i = 0; i < this.TOTAL_ROW; i++) {
      let rowNode = [];
      for (let j = 0; j < this.TOTAL_COL; j++) {
        if (i === this.INIT_START_ROW && j === this.INIT_START_COL) {
          rowNode.push(new Node(i, j, true, false));
        } else if (i === this.INIT_FINISH_ROW && j === this.INIT_FINISH_COL) {
          rowNode.push(new Node(i, j, false, true));
        } else {
          rowNode.push(new Node(i, j));
        }
      }
      this.grid.push(rowNode);
    }
  }

  onMouseUp(node: Node) {
    if (this.isMousePressed && this.isEmptyNodePressed === false) {
      // change start or finish node;
      this.grid = this.changeStartOrFinishNode(this.grid, node, this.mouseDownPressedNode);
    }
    this.isMousePressed = false;
  }
  onMouseDown(node: Node) {
    this.mouseDownPressedNode = node;
    this.isMousePressed = true;

    if (node.isStart || node.isFinish) {
      this.isEmptyNodePressed = false;
      // scale animate start or finish node
      let el: Element = document.getElementById(`node-${node.x}-${node.y}`) || new Element;
      el.classList.add("node-scale-down")

    } else {
      this.isEmptyNodePressed = true;
      this.grid = this.getNewGridWithWallToggled(this.grid, node, false);
    }
  }

  onMouseEnter(node: Node) {

    if (this.isEmptyNodePressed && this.isMousePressed) {
      this.grid = this.getNewGridWithWallToggled(this.grid, node, true);

    } else if (this.isEmptyNodePressed === false
    ) {
      //toggle animate start or finish node
    }
  }

  getNewGridWithWallToggled(grid: Node[][], node: Node, isDrag: boolean = false) {

    const newGrid = grid.slice();

    newGrid[node.x][node.y].isWall = isDrag ? true : !node.isWall;

    return newGrid;
  }

  changeStartOrFinishNode(grid: Node[][], node: Node, prevNode: Node) {
    const newGrid = grid.slice();

    if (prevNode.isStart) {
      newGrid[node.x][node.y].isStart = !node.isStart;
      newGrid[prevNode.x][prevNode.y].isStart = !prevNode.isStart;

      //if new node is already a wall then diable wall
      newGrid[node.x][node.y].isWall = false;

      this.START_ROW = node.x;
      this.START_COL = node.y;

    } else if (prevNode.isFinish) {
      newGrid[node.x][node.y].isFinish = !node.isFinish;
      newGrid[prevNode.x][prevNode.y].isFinish = !prevNode.isFinish;

      //if new node is already a wall then diable wall
      newGrid[node.x][node.y].isWall = false;

      this.FINISH_ROW = node.x;
      this.FINISH_COL = node.y

    }


    return newGrid;
  }

  animate(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) {

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.selectedSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        let el: Element = document.getElementById(`node-${node.x}-${node.y}`) || new Element;
        el.className =
          'node node-visited';
      }, this.selectedSpeed * i);
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
