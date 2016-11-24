'use strict';

System.register(['aurelia-framework', './aurelia-tags-input.scss'], function (_export, _context) {
  "use strict";

  var bindable, inject, computedFrom, AureliaTagsInput;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_aureliaTagsInputScss) {}],
    execute: function () {
      _export('AureliaTagsInput', AureliaTagsInput = function () {
        function AureliaTagsInput() {
          _classCallCheck(this, AureliaTagsInput);

          this.tags = [];

          this.onTagClick = this.onTagClick.bind(this);
          this.onTagBlur = this.onTagBlur.bind(this);
          this.onTagKeyPress = this.onTagKeyPress.bind(this);
        }

        AureliaTagsInput.prototype.attached = function attached() {
          this.addNewTag();
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
            focus: focus,
            index: this.tags.length
          });
        };

        AureliaTagsInput.prototype.removeTag = function removeTag(tag) {
          var idx = this.tags.indexOf(tag);
          if (idx > -1) {
            this.addNewTag();
            this.tags.splice(idx, 1);
          }
        };

        AureliaTagsInput.prototype.onTagClick = function onTagClick(tag, action) {
          console.log('onTagClick', action, tag.value);
          tag.editing = true;

          if (action === 'delete') {
            this.removeTag(tag);
          }
        };

        AureliaTagsInput.prototype.onTagBlur = function onTagBlur(tag, e) {
          console.log('onBlur', tag.value, e);
          var emptyTag = !tag.value || !tag.value.length;
          var lastTag = this.tags.indexOf(tag) === this.tags.length - 1;

          if (!emptyTag) {
            tag.editing = false;
            if (lastTag) {
              this.addNewTag();
            }
          }
          if (!lastTag && emptyTag) {
            this.removeTag(tag);
          }
        };

        AureliaTagsInput.prototype.onTagKeyPress = function onTagKeyPress(tag, e) {
          var key = e.which || e.keyCode;

          if (key == 13) {
            console.log('onTagKeyPress', tag.value);
            tag.editing = false;
            this.addNewTag();
            return false;
          }
          return true;
        };

        return AureliaTagsInput;
      }());

      _export('AureliaTagsInput', AureliaTagsInput);
    }
  };
});