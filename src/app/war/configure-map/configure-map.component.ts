import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-map',
  templateUrl: './configure-map.component.html',
  styleUrls: ['./configure-map.component.scss']
})
export class ConfigureMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('configuring')
  }

}
