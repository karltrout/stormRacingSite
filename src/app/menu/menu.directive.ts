import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[menuMouseDirective]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class MenuDirective {
  private _defaultColor = 'blue';
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  onMouseEnter() {
     this.height('30px');
   }

  onMouseLeave() {
     this.height( '5px' );
   }

   private height (myHeight:string ) {
    this.el.style.height = myHeight;
  }

}
