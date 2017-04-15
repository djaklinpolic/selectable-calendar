# sputnik-selectable-calendar

Calendar widget with advanced selecting features.

## Usage

### Markup

```html

<table class="SelectableCalendar">

	<tr>
	   <th colspan="7" class="SelectableCalendar-weekHead" data-weekcol="0">Week Head</th>
	   <th colspan="7" class="SelectableCalendar-weekHead" data-weekcol="1">Week Head</th>

	   <!-- ... -->
	</tr>

	<tr>
		<th class="SelectableCalendar-dayHead" data-group="0" data-daycol="0" data-weekcol="0">
			Day Head
		</th>
		<th class="SelectableCalendar-dayHead" data-group="0" data-daycol="1" data-weekcol="0">
			Day Head
		</th>
		<!-- + 5 -->

		<th class="SelectableCalendar-dayHead" data-group="1" data-daycol="7" data-weekcol="1">
			Day Head
		</th>
		<th class="SelectableCalendar-dayHead" data-group="1" data-daycol="8" data-weekcol="1">
			Day Head
		</th>
		<!-- + 5 -->

		<!-- ... -->
	</tr>

	<tr class="SelectableCalendar-dayRow">

		<td class="SelectableCalendar-dayCell" data-daycol="0" data-weekcol="0" data-day="19" data-month="10" data-year="2016">Day Cell</td>
		<td class="SelectableCalendar-dayCell" data-daycol="1" data-weekcol="0" data-day="20" data-month="10" data-year="2016">Day Cell</td>
		<!-- + 5 -->

		<td class="SelectableCalendar-dayCell" data-daycol="8" data-weekcol="1" data-day="26" data-month="10" data-year="2016">Day Cell</td>
		<td class="SelectableCalendar-dayCell" data-daycol="9" data-weekcol="1" data-day="27" data-month="10" data-year="2016">Day Cell</td>
		<!-- + 5 -->

		<!-- ... -->
	</tr>

</table>
```

### Script Initialization

```js

	$('.SelectableCalendar').selectableCalendar({
		// defaults
	    selectedClass: 'ui-selected',
	    weekHeadClass: 'SelectableCalendar-weekHead',
	    dayHeadClass: 'SelectableCalendar-dayHead',
	    dayCellClass: 'SelectableCalendar-dayCell',
	    dataWeekColName: 'weekcol',
	    dataDayColName: 'daycol',
	    dataYearName: 'year',
	    dataMonthName: 'month',
	    dataDayName: 'day',

	    selectionUpdate: function ( data ) {
	    	console.log(data);
	    }
	});

```