import { bindable } from 'aurelia-framework';

export class TagInput {
  @bindable tag;

  @bindable onClick;
  @bindable onBlur;
  @bindable onKeyPress;

  constructor() {
    this.tag = {};
  }
}
