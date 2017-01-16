import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'menu-component',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],

})
export class MenuComponent  {

  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  private coordinates(event: MouseEvent):void {
    this.event = event;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    console.log("X "+this.clientX+" Y: "+this.clientY);
  }

}
