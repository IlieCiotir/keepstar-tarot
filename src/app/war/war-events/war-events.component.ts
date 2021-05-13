import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { Node } from '../model/war.actions';

@Component({
  selector: 'app-war-events',
  templateUrl: './war-events.component.html',
  styleUrls: ['./war-events.component.scss']
})
export class WarEventsComponent implements OnInit {
  public logs: string[] = [];
  public viewedNode: Node = null;
  private nodeChanged$ = new Subject<Node>();

  constructor() { }

  ngOnInit(): void {
    this.nodeChanged$.pipe(debounceTime(200))
      .subscribe(node => this.viewedNode = node);
  }

  public addLog(node: Node, action: string) {
    this.logs.unshift(`${action} ${node.name}`);
    this.nodeChanged$.next(node);
  }

  public enter(node: Node) {
    this.nodeChanged$.next(node);
  }

  public leave(node: Node) {
    this.nodeChanged$.next(null);
  }

}
