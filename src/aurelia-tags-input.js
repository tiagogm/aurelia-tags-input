import { bindable,bindingMode,computedFrom } from 'aurelia-framework';

export class AureliaTagsInput {

  @bindable tags;
  @bindable onChanged;

  constructor() {
    this.tags = [];

    this.onClick = this.onClick.bind(this);

    this.onTagClick = this.onTagClick.bind(this);
    this.onTagBlur = this.onTagBlur.bind(this);
    this.onTagKey = this.onTagKey.bind(this);
  }

  tagsChanged(value) {
    if (value instanceof Array) {
      this.tags = value.map(value => { return { value } });
      this.addNewTag();
    }
  }
  
  onClick() {
    if(!this.tags.length) {
      this.tags[this.tags.length-1].focus = true;
    }

  }

  updateTags() {
    if (typeof this.onChanged === 'function') {
      this.onChanged(this.tags.map(t => { return t.value }));
    }
  }

  addNewTag() {
    if (!this.tags.find(x => x.editing)) {
      this.addTag('',true,true);
    }
  }

  addTag(value,editing = false,focus = false) {
    this.tags.push({
      value,
      editing,
      focus,
    });

    if (value) {
      this.updateTags();
    }
  }

  removeTag(tag) {
    let idx = this.tags.indexOf(tag);
    if (idx > -1) {
      this.tags.splice(idx,1);
      this.updateTags();
    }
  }

  editTag(tag,edit) {
    tag.editing = edit;
    if (!edit) {
      this.updateTags();
    }
  }

  onTagClick(tag,action) {
    if (action === 'delete') {
      this.removeTag(tag);
      return;
    }

    this.editTag(tag,true);
  }

  onTagBlur(tag, e) {
    let emptyTag = (!tag.value || !tag.value.length);
    let lastTag = (this.tags.indexOf(tag) === this.tags.length - 1);

    if (!emptyTag) {
      this.editTag(tag,false);

      if (lastTag) {
        this.addNewTag();
      }
    }

    if (!lastTag && emptyTag) {
      this.removeTag(tag);
    }
  }

  onTagKey(tag,e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
      this.editTag(tag,false);
      this.addNewTag();
      return false;
    }

    return true;
  }
}
