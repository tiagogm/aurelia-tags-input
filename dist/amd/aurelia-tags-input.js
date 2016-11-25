define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AureliaTagsInput = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var _desc, _value, _class, _descriptor, _descriptor2;

  var AureliaTagsInput = exports.AureliaTagsInput = (_class = function () {
    function AureliaTagsInput() {
      _classCallCheck(this, AureliaTagsInput);

      _initDefineProp(this, 'tags', _descriptor, this);

      _initDefineProp(this, 'onChanged', _descriptor2, this);

      this.tags = [];

      this.onClick = this.onClick.bind(this);

      this.onTagClick = this.onTagClick.bind(this);
      this.onTagBlur = this.onTagBlur.bind(this);
      this.onTagKey = this.onTagKey.bind(this);
    }

    AureliaTagsInput.prototype.tagsChanged = function tagsChanged(value) {
      if (value instanceof Array) {
        this.tags = value.map(function (value) {
          return { value: value };
        });
        this.addNewTag();
      }
    };

    AureliaTagsInput.prototype.onClick = function onClick() {
      if (!this.tags.length) {
        this.tags[this.tags.length - 1].focus = true;
      }
    };

    AureliaTagsInput.prototype.updateTags = function updateTags() {
      if (typeof this.onChanged === 'function') {
        this.onChanged(this.tags.map(function (t) {
          return t.value;
        }));
      }
    };

    AureliaTagsInput.prototype.addNewTag = function addNewTag() {
      if (!this.tags.find(function (x) {
        return x.editing;
      })) {
        this.addTag('', true, true);
      }
    };

    AureliaTagsInput.prototype.addTag = function addTag(value) {
      var editing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var focus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.tags.push({
        value: value,
        editing: editing,
        focus: focus
      });

      if (value) {
        this.updateTags();
      }
    };

    AureliaTagsInput.prototype.removeTag = function removeTag(tag) {
      var idx = this.tags.indexOf(tag);
      if (idx > -1) {
        this.tags.splice(idx, 1);
        this.updateTags();
      }
    };

    AureliaTagsInput.prototype.editTag = function editTag(tag, edit) {
      tag.editing = edit;
      if (!edit) {
        this.updateTags();
      }
    };

    AureliaTagsInput.prototype.onTagClick = function onTagClick(tag, action) {
      if (action === 'delete') {
        this.removeTag(tag);
        return;
      }

      this.editTag(tag, true);
    };

    AureliaTagsInput.prototype.onTagBlur = function onTagBlur(tag, e) {
      var emptyTag = !tag.value || !tag.value.length;
      var lastTag = this.tags.indexOf(tag) === this.tags.length - 1;

      if (!emptyTag) {
        this.editTag(tag, false);

        if (lastTag) {
          this.addNewTag();
        }
      }

      if (!lastTag && emptyTag) {
        this.removeTag(tag);
      }
    };

    AureliaTagsInput.prototype.onTagKey = function onTagKey(tag, e) {
      var key = e.which || e.keyCode;

      if (key === 13) {
        this.editTag(tag, false);
        this.addNewTag();
        return false;
      }

      return true;
    };

    return AureliaTagsInput;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tags', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'onChanged', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});