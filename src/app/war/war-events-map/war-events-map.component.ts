import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { warFeatureKey, WarState } from '../model/war.reducer';
import * as d3 from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import * as d3Drag from 'd3-drag';
import * as d3Force from 'd3-force';

import { Link, loadWars, Node } from '../model/war.actions';
import { selectWarState } from '../model/war.selectors';
import { filter, first, tap } from 'rxjs/operators';

import { clone } from 'ramda';


// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity
  // Use D3 to select element, change color and size
  const node = d3.select(this);
  console.log(node)
  node
    .select("circle")
    .attr('stroke', 'green')
    .attr('stroke-width', 3).attr("r", 20)
    ;

  node.append("text")
    .attr("x", 25)
    .attr("y", 5)
    .text((d: Node) => d.name)
    .attr('fill', "white")

}

function handleMouseOut(d, i) {
  // Use D3 to select element, change color back to normal
  const node = d3.select(this)
  node.select("circle")
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr("r", 15);
  node.select("text").remove()
  node.select("rect").remove()

}

@Component({
  selector: 'app-war-events-map',
  templateUrl: './war-events-map.component.html',
  styleUrls: ['./war-events-map.component.scss']
})
export class WarEventsMapComponent implements OnInit, AfterViewInit {
  public busy = false;
  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = null;

  @Output()
  public systemEntered = new EventEmitter<Node>();
  @Output()
  public systemLeft = new EventEmitter<Node>();


  constructor(private store: Store<{ [warFeatureKey]: WarState }>) {
    this.store.select(selectWarState)
      .pipe(
        tap(({ busy }) => this.busy = busy),
        filter(({ nodes }) => nodes.length > 0),
        first()
      )
      .subscribe(({ nodes, links }) => {
        this.createEventMap(clone(nodes), clone(links));
      })
  }
  ngAfterViewInit() {
    console.log('afterview')
  }

  ngOnInit(): void {
    this.store.dispatch(loadWars());
  }

  private createEventMap(nodes: Node[], links: Link[]) {
    console.log(`creatingMap`)
    this.createSvg();
    console.log(this.svg);
    this.createSimulation(nodes, links)

  }

  private createSvg() {
    let svgLocal = this.svg = d3.select("#delve-events-map")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100vh')
      .call(d3Zoom.zoom().on("zoom", function (event) {
        svgLocal.attr("transform", event.transform)
      }))
      .append("g")
      .attr("transform",
        "translate(" + 0 + "," + 0 + ")")
  }

  private createSimulation(nodes: Node[], links: Link[]) {
    var link = this.svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", "#aaa")

    const that = this;
    // Initialize the nodes
    var node = this.svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")

      .classed('node', true)
      .classed("delve", (d) => d.region === "Delve")
      .on("mouseover", function (d, i) { that.systemEntered.emit(i); handleMouseOver.bind(this)(d, i) })
      .on("mouseout", function (d, i) { that.systemLeft.emit(i); handleMouseOut.bind(this)() })
      .on("dblclick", (d) => { d.fx = null; d.fy = null; })
      .call(d3Drag.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    const circle = node.append("circle")
      .attr("fill", "black")
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .attr('r', 15)
      .attr('style', 'transition:all 0.3s ease;')
    node
      .append("image")
      .attr("xlink:href", "/assets/icons/citadelExtraLarge.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);
    // Let's list the force we wanna apply on the network
    var simulation = d3Force.forceSimulation()                 // Force algorithm is applied to data.nodes


      .force("charge", d3Force.forceManyBody().strength(-1000).distanceMax(500))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3Force.forceCenter(1000 / 2, 800 / 2))
      .force("collide", d3Force.forceCollide().radius(d => 30))
      .force("y", d3Force.forceY(0))
      .force("x", d3Force.forceX(0))
      .alphaDecay(0.1)   // This force attracts nodes to the center of the svg area
      .on("end", ticked);
    simulation
      .nodes(nodes)
      .on("tick", ticked);

    simulation.force("link", d3Force.forceLink()                               // This force provides links between nodes
      .id(function (d) { return (d as Link).id; })                     // This provide  the id of a node
      .links(links)
      .strength(link => {

        if ((link.source as Node).constellation === (link.target as Node).constellation) {
          return 1.2;
        }
        return 0.5;
      })
    )
    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
      link
        .attr("x1", function (d) { return (d.source as any).x; })
        .attr("y1", function (d) { return (d.source as any).y; })
        .attr("x2", function (d) { return (d.target as any).x; })
        .attr("y2", function (d) { return (d.target as any).y; });

      node.attr("transform", function (d: any) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = event.x;
      d.fy = event.y;
    }
  }

}
