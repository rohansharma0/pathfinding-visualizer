export class Node {
    x: number;
    y: number;
    isStart: boolean = false;
    isFinish: boolean = false;
    distance: number = Infinity;
    isVisited: boolean = false;
    isWall: boolean = false;
    previousNode !: Node;

    constructor(x: number, y: number, isStart: boolean = false, isFinish: boolean = false) {
        this.x = x;
        this.y = y;
        this.isStart = isStart;
        this.isFinish = isFinish;
    }
}
