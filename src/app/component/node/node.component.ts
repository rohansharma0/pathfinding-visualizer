import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Node } from 'src/app/model/node';


@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {

  @Input() node !: Node;

  @Output() onMouseEnterEvent = new EventEmitter<Node>();
  @Output() onMouseUpEvent = new EventEmitter<Node>();
  @Output() onMouseDownEvent = new EventEmitter<Node>();

  onMouseEnter(node: Node) {
    this.onMouseEnterEvent.emit(node);
  }
  onMouseUp(node: Node) {
    this.onMouseUpEvent.emit(node);
  }
  onMouseDown(node: Node) {
    this.onMouseDownEvent.emit(node);
  }

}
