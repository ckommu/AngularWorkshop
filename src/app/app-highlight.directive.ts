import { Directive, ElementRef, HostListener } from '@angular/core';

// TS decorator for all defined directives
@Directive({
  selector: '[appHighlight]', // Use it as an attribute in your templates
  standalone: true,
})

export class HighlightDirective {
  
  // elementref gives direct access to the DOM element this service will be applied to
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}