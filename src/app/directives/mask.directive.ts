import { Directive, ElementRef, HostListener, Input,Optional } from '@angular/core';
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[mask]'
})
export class MaskDirective {
  @Input()
  set mask(value) {
    this.regExpr = new RegExp(value);
  }
  
  private _oldvalue: string = "";
  private regExpr: any;
  constructor(@Optional() private control:NgControl) {
  }
  @HostListener('input', ['$event'])
  change($event) {

    let item = $event.target
    let value = item.value;
    let pos = item.selectionStart;
    let matchvalue = value;
    let noMatch: boolean = (value && !(this.regExpr.test(matchvalue)));
    if (noMatch) {
      item.selectionStart = item.selectionEnd = pos - 1;
      if (item.value.length < this._oldvalue.length && pos == 0)
        pos = 2;
      if (this.control)
        this.control.control.setValue(this._oldvalue, { emit: false });

      item.value = this._oldvalue;
      item.selectionStart = item.selectionEnd = pos - 1;
    }
    else
      this._oldvalue = value;
  }
}