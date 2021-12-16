import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { Pipe, PipeTransform } from "@angular/core";
import {formatNumber} from"@angular/common"


@Directive({ selector: "[decimal2]" })
export class Decimal2Directive implements OnInit {
  private el: HTMLInputElement;
  private value: any;
  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }
  @HostListener("focus", ["$event.target.value"])
  onFocus() {
    this.el.value = this.value;
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: any) {
    this.transform(value);
  }
  ngOnInit() {
    this.transform(this.el.value);
  }
  transform(value: any) {
    this.value = value;
    if (value && !isNaN(value)) {
      this.el.value=formatNumber(+this.value, "en-US", '1.2-2');
      const formated=this.el.value.split(',').join('')
      if (formated.indexOf(this.value) >= 0) this.value = formated;
    }
  }
}
