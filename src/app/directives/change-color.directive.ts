import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
})
export class ChangeColorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('text-green');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('text-green');
  }

  private highlight(addedClass: string) {
    this.el.nativeElement.classList.toggle(addedClass);
  }
}
