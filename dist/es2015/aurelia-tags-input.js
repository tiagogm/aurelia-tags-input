var _desc, _value, _class, _descriptor, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { bindable, bindingMode, computedFrom } from 'aurelia-framework';

export let AureliaTagsInput = (_class = class AureliaTagsInput {

  constructor() {
    _initDefineProp(this, 'tags', _descriptor, this);

    _initDefineProp(this, 'onChanged', _descriptor2, this);

    this.tags = [];

    this.onClick = this.onClick.bind(this);

    this.onTagClick = this.onTagClick.bind(this);
    this.onTagBlur = this.onTagBlur.bind(this);
    this.onTagKey = this.onTagKey.bind(this);
  }

  tagsChanged(value) {
    if (value instanceof Array) {
      this.tags = value.map(value => {
        return { value };
      });
      this.addNewTag();
    }
  }

  onClick() {
    if (!this.tags.length) {
      this.tags[this.tags.length - 1].focus = true;
    }
  }

  updateTags() {
    if (typeof this.onChanged === 'function') {
      this.onChanged(this.tags.map(t => {
        return t.value;
      }));
    }
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
      focus
    });

    if (value) {
      this.updateTags();
    }
  }

  removeTag(tag) {
    let idx = this.tags.indexOf(tag);
    if (idx > -1) {
      this.tags.splice(idx, 1);
      this.updateTags();
    }
  }

  editTag(tag, edit) {
    tag.editing = edit;
    if (!edit) {
      this.updateTags();
    }
  }

  onTagClick(tag, action) {
    if (action === 'delete') {
      this.removeTag(tag);
      return;
    }

    this.editTag(tag, true);
  }

  onTagBlur(tag, e) {
    let emptyTag = !tag.value || !tag.value.length;
    let lastTag = this.tags.indexOf(tag) === this.tags.length - 1;

    if (!emptyTag) {
      this.editTag(tag, false);

      if (lastTag) {
        this.addNewTag();
      }
    }

    if (!lastTag && emptyTag) {
      this.removeTag(tag);
    }
  }

  onTagKey(tag, e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
      this.editTag(tag, false);
      this.addNewTag();
      return false;
    }

    return true;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tags', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'onChanged', [bindable], {
  enumerable: true,
  initializer: null
})), _class);