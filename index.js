var $ = require('jquery');
var view = require('kist-view');
var SelectableCalendar;


require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/selectable');

SelectableCalendar = view.extend({

	options: {
		selectedClass: 'ui-selected',
		weekHeadClass: 'SelectableCalendar-weekHead',
		dayHeadClass: 'SelectableCalendar-dayHead',
		dayCellClass: 'SelectableCalendar-dayCell',
		dataWeekColName: 'weekcol',
		dataDayColName: 'daycol',
		dataYearName: 'year',
		dataMonthName: 'month',
		dataDayName: 'day'
	},

	init: function ( instance, options ) {
		this.setOptions(options);
		this.setElement(instance);
		this.setupEvents();

		this.namespace = 'selectableCalendar';

		this.$el.selectable({
			filter: 'td, th',

			selected: function ( e, selection ) {
				this.updateSelection($(selection.selected), e);
			}.bind(this),

			unselected: function ( e, selection ) {
				this.updateSelection($(selection.unselected), e);
			}.bind(this)
		});

		this.updateHeadsByPreselectedCells();
	},

	setupEvents: function () {

		this.$el.on('mousedown' + '.' + this.namespace, function ( e ) {
			// forces the same behaviour as if Ctrl/Cmd is pressed
			e.metaKey = true;
		});

		this.$doc.on('mousemove' + '.' + this.namespace, function ( e ) {
			e.metaKey = true;
		});
	},

	updateSelection: function ( selection, e ) {
		this.updateCellsByHeads(selection, e);
		this.updateHeadsByCells(selection, this.options.dataWeekColName);
		this.updateHeadsByCells(selection, this.options.dataDayColName);

		if ( this.options.selectionUpdate && typeof this.options.selectionUpdate === 'function' ) {
			this.options.selectionUpdate.call(this, this.exportData($('.' + this.options.dayCellClass + '.' + this.options.selectedClass)));
		}
	},

	updateCellsByHeads: function ( $el, e ) {

		if ( $el.hasClass(this.options.weekHeadClass) ) {

			$('[data-' + this.options.dataWeekColName + '=' + $el.data(this.options.dataWeekColName) + ']')[e.type === 'selectableunselected' ? 'removeClass' : 'addClass'](this.options.selectedClass);

		} else if ( $el.hasClass(this.options.dayHeadClass) ) {

			$('[data-' + this.options.dataDayColName + '=' + $el.data(this.options.dataDayColName) + ']')[e.type === 'selectableunselected' ? 'removeClass' : 'addClass'](this.options.selectedClass);
			this.updateWeekHeadbyDayHead($el, this.options.dataWeekColName);
		}
	},

	updateHeadsByCells: function ( $el, col, condition ) {
		var $dayCellsInCol, $dayCellsInColSelected, $head;

		if ( $el.hasClass(this.options.dayCellClass) || condition ) {

			$dayCellsInCol = $('.' + this.options.dayCellClass + '[data-' + col + '=' + $el.data(col) + ']');
			$dayCellsInColSelected = $('.' + this.options.dayCellClass + '.' + this.options.selectedClass + '[data-' + col + '=' + $el.data(col) + ']');
			$head = $('.' + (col === this.options.dataWeekColName ? this.options.weekHeadClass : this.options.dayHeadClass) + '[data-' + col + '=' + $el.data(col) + ']');

			if ( $dayCellsInCol.length !== $dayCellsInColSelected.length ) {
				$head.removeClass(this.options.selectedClass);
			} else {
				$head.addClass(this.options.selectedClass);
			}
		}
	},

	updateWeekHeadbyDayHead: function ( $el, col ) {
		this.updateHeadsByCells($el, col, $el.hasClass(this.options.dayHeadClass));
	},

	updateHeadsByPreselectedCells: function () {

		$.each($('.' + this.options.selectedClass), function (i, el) {
			this.updateHeadsByCells($(el), this.options.dataWeekColName);
			this.updateHeadsByCells($(el), this.options.dataDayColName);
		}.bind(this));

	},

	exportData: function ( $selection ) {
		var data = [];

		$selection.each(function (i, el) {
			var $el = $(el);

			data.push({
				dayIndex: $el.index(),
				date: new Date($el.data(this.options.dataYearName), $el.data(this.options.dataMonthName), $el.data(this.options.dataDayName))
			});
		}.bind(this));

		return data;
	},

	destroy: function ( isSelectionRemoved ) {
		this.$el.selectable('destroy');
		this.$el.off('.' + this.namespace);
		this.$doc.off('.' + this.namespace);

		if ( isSelectionRemoved ) {
			this.$el.find('.' + this.options.selectedClass).removeClass(this.options.selectedClass);
		}
	}
});

module.exports = $.fn['selectableCalendar'] = function ( optionsOrMethod ) {
	var additionalArguments = Array.prototype.slice.call(arguments, 1);

	return this.each(function () {
		if (!$.data(this, 'plugin_' + 'selectableCalendar')) {
			$.data(this, 'plugin_' + 'selectableCalendar', new SelectableCalendar(this, optionsOrMethod));
		} else {
			if (typeof optionsOrMethod === 'string') {
				SelectableCalendar.prototype[optionsOrMethod].apply($.data(this, 'plugin_' + 'selectableCalendar'), additionalArguments);
			}
		}
	});
};
