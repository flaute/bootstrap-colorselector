/*
 * A colorselector for Twitter Bootstrap which lets you select a color from a predefined set of colors only.
 * https://github.com/flaute/bootstrap-colorselector
 *
 * Copyright (C) 2013 Flaute
 *
 * Licensed under the MIT license
 */

(function($) {
	"use strict";

	var ColorSelector = function(select, options) {
		this.options = options;
		this.$select = $(select);

		this._init();
	};

	ColorSelector.prototype = {

		// constructor
		constructor : ColorSelector,

		_init : function() {

			// selected value
			var selectValue = this.$select.val();
			// selected text
			var selectText = this.$select.find("option:selected").text();
			// selected color
			var selectColor = this.$select.find("option:selected")
					.data("color");

			var colorsPerRow = this.options.colorsPerRow;
			var callback = this.options.callback;

			// hide the select-tag with all its options
			this.$select.hide();

			// markup for the colorselector button
			var $markupSelectorButton = $("<div>").addClass(
					"pick-a-color-markup").addClass("btn-group").append(
					$("<button>").attr("type", "button").addClass(
							"btn color-dropdown dropdown-toggle").append(
							$("<span>").addClass("color-preview current-color")
									.attr("style",
											"background-color:" + selectColor))
							.append($("<span>").addClass("caret")));

			// markup for the picker
			var $markupPicker = $("<div>").addClass("colorselector").addClass(
					"picker");

			var colorCounter = 0;

			// iterate over all options of the select-tag
			$("option", this.$select).each(

					function() {

						var option = $(this);
						var value = option.attr("value");
						var color = option.data("color");
						var title = option.text();

						// markup for a colorDiv
						var markupColorDiv = $("<div>").attr("role", "button")
								.attr("tabindex", "0").attr("title", title)
								.attr("data-value", value).attr("data-color",
										color).attr("style",
										"background-color:" + color).addClass(
										"colorDiv").html("");

						// set class for the selected color
						if (option.prop("selected") === true
								|| selectValue === color) {
							$(markupColorDiv).addClass("selected");
							// call the user-defined callback function
							callback(value, color, title);
						}

						// insert a new line every n colors
						if (colorCounter % colorsPerRow == 0
								&& colorCounter != 0) {
							$markupPicker.append("<br />");
						}
						colorCounter++;

						// add colorDiv markup to the picker
						$markupPicker.append(markupColorDiv);

					});

			// insert the selector-button markup after the original select-tag
			this.$selectorButton = $($markupSelectorButton).insertAfter(
					this.$select);
			// insert the picker markup at the end of the body
			this.$picker = $($markupPicker).appendTo(document.body);

			// register click-handler on the selector-button to show the picker
			this.$selectorButton.on('click.colorselector', $.proxy(
					this.showPicker, this));
			// register mousedown-handler on the picker for clicks on the color
			// divs
			this.$picker.on('mousedown.colorselector', $.proxy(
					this.mousedownColorDiv, this));
			// register mousedown-handler on document to hide picker when
			// clicking
			// outside
			$(document).on('mousedown.colorselector',
					$.proxy(this.hidePicker, this));
		},

		setColor : function(color) {

			// find the colorDiv for the given color
			var colorDiv = this.$picker.find('div').filter(
					function() {
						return $(this).data('color').toLowerCase() === color
								.toLowerCase();
					});
			// select the found colorDiv
			this._setColorDiv(colorDiv);
		},

		setId : function(id) {

			// find the colorDiv for the given color
			var colorDiv = this.$picker.find('div').filter(function() {
				return $(this).data('value') === id;
			});
			// select the found colorDiv
			this._setColorDiv(colorDiv);
		},

		showPicker : function() {

			var bootstrapArrowWidth = 12;
			var pos = this.$selectorButton.offset();
			var width = this.$selectorButton.children(":first").children(
					":first").width();

			// set the position on the screen
			this.$picker.css({
				left : pos.left + width / 2 - bootstrapArrowWidth,
				top : pos.top + this.$selectorButton.outerHeight()
			});

			// make the picker visible
			this.$picker.show();
		},

		hidePicker : function() {
			this.$picker.hide();
		},

		_setColorDiv : function(colorDiv) {

			var value = colorDiv.data("value");
			var color = colorDiv.data("color");
			var title = colorDiv.prop("title");

			// mark this div as the selected one
			colorDiv.siblings().removeClass("selected");
			colorDiv.addClass("selected");

			// change the icon's color and title
			this.$selectorButton.children(":first").children(":first").css(
					"background-color", color);
			this.$selectorButton.prop("title", title);

			// hide the picker
			this.hidePicker();

			// change HTML selected option
			this.$select[0].selectedIndex = -1; // Safari
			this.$select.children().removeAttr("selected");
			this.$select.children("option[value='" + value + "']").attr(
					"selected", true);
			this.$select[0].value = value; // Firefox
			// trigger the change-handler
			this.$select.trigger("change");

			// call the user-defined callback function
			this.options.callback(value, color, title);
		},

		mousedownColorDiv : function(e) {

			var target = $(e.target);
			if (target.length === 1) {
				if (target[0].nodeName.toLowerCase() === "div") {
					// select the color that was choosen by a click on the
					// corresponding
					// div tag
					this._setColorDiv(target);
				}
			}
		},

		destroy : function() {

			this.$selectorButton.off(".colorselector");
			this.$picker.off(".colorselector");
			// $(document).off(".colorselector");

			this.$selectorButton.remove();
			this.$picker.remove();

			this.$select.removeData("colorselector");
			this.$select.show();
		}
	};

	$.fn.colorselector = function(option) {
		var args = Array.apply(null, arguments);
		args.shift();

		return this
				.each(function() {

					var $this = $(this), data = $this.data("colorselector"), options = $
							.extend({}, $.fn.colorselector.defaults, $this
									.data(), typeof option == "object"
									&& option);

					if (!data) {
						$this.data("colorselector", (data = new ColorSelector(
								this, options)));
					}
					if (typeof option == "string") {
						data[option].apply(data, args);
					}
				});
	};

	$.fn.colorselector.defaults = {
		callback : function(value, color, title) {
		},
		colorsPerRow : 8
	};

	$.fn.colorselector.Constructor = ColorSelector;

})(jQuery, window, document);
