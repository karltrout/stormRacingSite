import {
  Component,
    trigger,
    state,
    style,
    transition,
    animate } from '@angular/core';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  animations: [
    trigger('shrinkUp', [
      state('in', style({
        backgroundColor: '#eee',
        transform: 'translateY(0%)'
      })),
      state('out',   style({
        backgroundColor: '#cfd8dc',
        transform: 'translateY(-90%)'
      })),
      transition('in => out', animate('500ms ease-in')),
      transition('out => in', animate('500ms ease-out'))
    ])
  ]
})
export class MenuComponent  {

  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  private mouseEntered="out";

  private coordinates(event: MouseEvent):void {
    this.event = event;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    console.log("X "+this.clientX+" Y: "+this.clientY);
  }

  private onEvent(event: MouseEvent): void {

    console.log("Event -> " + event.type);

    if(event.type === "mouseleave"){
       this.mouseEntered="out";
      console.log("Event -> " + this.mouseEntered);
    }

    if(event.type === "mouseenter"){
       this.mouseEntered="in";
      console.log("Event -> " + this.mouseEntered);
    }

  }

}
