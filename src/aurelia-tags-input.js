import './styles.css';

export class AureliaTagsInput {

  constructor() {
    this.tags = [];

    this.onTagClick = this.onTagClick.bind(this);
    this.onTagBlur = this.onTagBlur.bind(this);
    this.onTagKeyPress = this.onTagKeyPress.bind(this);
  }

  attached() {
    // this.addTag('new tag');
    // this.addTag('new tag 2');
    this.addNewTag();
  }

  addNewTag() {
    if (!this.tags.find(x => x.editing)) {
      this.addTag('', true, true);
    }
  }

  addTag(value, editing = false, focus = false) {
    this.tags.push({
      value,
      editing,
      focus,
      index: this.tags.length
    });
  }

  removeTag(tag) {
    let idx = this.tags.indexOf(tag);
    if (idx > -1) {
      this.addNewTag();
      this.tags.splice(idx, 1);
    }
  }

  onTagClick(tag, action) {
    tag.editing = true;

    if (action === 'delete') {
      this.removeTag(tag);
    }
  }

  onTagBlur(tag, e) {
    let emptyTag = (!tag.value || !tag.value.length);
    let lastTag = (this.tags.indexOf(tag) === this.tags.length - 1);

    if (!emptyTag) {
      tag.editing = false;
      if (lastTag) {
        this.addNewTag();
      }
    }
    if (!lastTag && emptyTag) {
      this.removeTag(tag);
    }
  }

  onTagKeyPress(tag, e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
      tag.editing = false;
      this.addNewTag();
      return false;
    }
    return true;
  }
}

