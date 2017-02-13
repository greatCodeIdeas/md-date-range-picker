/*
* Name: md-date-range-picker
* Version: 0.2.2
* Build Date: 2/14/2017
* Author: roel barreto <greatcodeideas@gmail.com>
*/
(function (window, angular) {

    angular
        .module('ngMaterialDateRangePicker', ['ngMaterial'])
        .directive('mdDateRangePicker', mdDateRangePickerDirective)
        .directive('mdDateRange', mdDateRangeDirective)
        .service('$mdDateRangePicker', mdDateRangePickerService);
    /**
     * scope here is non-bi-directional
     */
    function mdDateRangePickerDirective() {
        var directive = {
            scope: {
                selectedTemplate: '=',
                selectedTemplateName: '=',
                dateStart: '=',
                dateEnd: '=',
                firstDayOfWeek: '=?',
                showTemplate: '=?',
                mdOnSelect: '&?'
            },
            template: '<div class="md-date-range-picker md-whiteframe-1dp"><div layout="column"><div layout="row" layout-margin><div class="md-date-range-picker__calendar-wrapper"><div class="md-date-range-picker__month-year" layout="row" layout-align="center center"><div flex layout="column" layout-align="center center"><span aria-label="Previous Month" class="md-button md-icon-button" event-key="prev"><md-icon md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><md-select md-container-class="md-date-range-picker__select" md-on-close="ctrl.updateActiveDate()" ng-model="ctrl.activeMonth" placeholder="Month" class="md-no-underline"><md-option ng-value="::month.id" ng-repeat="month in ctrl.months" ng-bind="::month.name"></md-option></md-select><md-select md-container-class="md-date-range-picker__select" md-on-close="ctrl.updateActiveDate()" ng-model="ctrl.activeYear" placeholder="Year" class="md-no-underline"><md-option ng-value="::year.id" ng-repeat="year in ctrl.years" ng-bind="::year.name"></md-option></md-select><div flex layout="column" layout-align="center center" class="hide-gt-sm"><span aria-label="Next Month" class="md-icon-button md-button" event-key="next"><md-icon style="transform: rotate(-180deg)" md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><div flex layout="column" layout-align="center center" class="hide show-gt-sm"><span aria-label="Next Month" ng-disabled="true" aria-hidden="true" class="md-icon-button md-button"><md-icon></md-icon></span></div></div><div class="md-date-range-picker__week" style="font-size: 0"><span class="md-date-range-picker__calendar__grid" ng-repeat="day in ctrl.days">{{::day.name}}</span></div><div class="md-date-range-picker__calendar"><span ng-repeat="date in ctrl.dates" class="md-date-range-picker__calendar__grid" ng-class="{\'md-date-range-picker__calendar__selected\':ctrl.inSelectedDateRange(date), \'md-date-range-picker__calendar__start\':ctrl.isSelectedStartDate(date), \'md-date-range-picker__calendar__end\':ctrl.isSelectedEndDate(date), \'md-date-range-picker__calendar__not-in-active-month\': !ctrl.inCurrentMonth(date), \'md-date-range-picker__calendar__today\' : ctrl.isToday(date) }" event-key="date1" event-param="{{$index}}"><span class="md-date-range-picker__calendar__selection" ng-bind="{{::date.getDate()}}"></span></span></div></div><div class="md-date-range-picker__calendar-wrapper hide show-gt-sm"><div class="md-date-range-picker__month-year" layout="row" layout-align="center center"><div flex layout="column" layout-align="center center" style="visibility: hidden"><span aria-label="Previous Month" class="md-button md-icon-button" event-key="prev"><md-icon md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><md-select md-container-class="md-date-range-picker__select" md-on-close="ctrl.updateActiveDate(true)" ng-model="ctrl.activeMonth2" placeholder="Month" class="md-no-underline"><md-option ng-value="::month.id" ng-repeat="month in ctrl.months" ng-bind="::month.name"></md-option></md-select><md-select md-container-class="md-date-range-picker__select" md-on-close="ctrl.updateActiveDate(true)" ng-model="ctrl.activeYear2" placeholder="Year" class="md-no-underline"><md-option ng-value="::year.id" ng-repeat="year in ctrl.years" ng-bind="::year.name"></md-option></md-select><div flex layout="column" layout-align="center center"><span aria-label="Next Month" class="md-icon-button md-button" event-key="next"><md-icon style="transform: rotate(-180deg)" md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div></div><div class="md-date-range-picker__week" style="font-size: 0"><span class="md-date-range-picker__calendar__grid" ng-repeat="day in ctrl.days">{{::day.name}}</span></div><div class="md-date-range-picker__calendar"><span ng-repeat="date in ctrl.dates2" class="md-date-range-picker__calendar__grid" ng-class="{\'md-date-range-picker__calendar__selected\':ctrl.inSelectedDateRange(date), \'md-date-range-picker__calendar__start\':ctrl.isSelectedStartDate(date), \'md-date-range-picker__calendar__end\':ctrl.isSelectedEndDate(date), \'md-date-range-picker__calendar__not-in-active-month\': !ctrl.inCurrentMonth(date, true), \'md-date-range-picker__calendar__today\' : ctrl.isToday(date) }" event-key="date2" event-param="{{$index}}"><span class="md-date-range-picker__calendar__selection" ng-bind="{{::date.getDate()}}"></span></span></div></div></div><div class="md-date-range-picker__templates" ng-if="ctrl.showTemplate"><div class="hide show-gt-sm" layout="row"><div flex layout="column"><span class="md-button" aria-label="Today" ng-class="ctrl.selectedTemplate === \'TD\' ? \'md-primary md-raised\' : \'\'" event-key="TD">Today</span><span class="md-button" aria-label="Yesterday" ng-class="ctrl.selectedTemplate === \'YD\' ? \'md-primary md-raised\' : \'\'" event-key="YD">Yesterday</span></div><div flex layout="column"><span class="md-button" aria-label="This Week" ng-class="ctrl.selectedTemplate === \'TW\' ? \'md-primary md-raised\' : \'\'" event-key="TW">This Week</span><span class="md-button" aria-label="Last Week" ng-class="ctrl.selectedTemplate === \'LW\' ? \'md-primary md-raised\' : \'\'" event-key="LW">Last Week</span></div><div flex layout="column"><span class="md-button" aria-label="This Month" ng-class="ctrl.selectedTemplate === \'TM\' ? \'md-primary md-raised\' : \'\'" event-key="TM">This Month</span><span class="md-button" aria-label="Last Month" ng-class="ctrl.selectedTemplate === \'LM\' ? \'md-primary md-raised\' : \'\'" event-key="LM">Last Month</span></div><div flex layout="column"><span class="md-button" aria-label="This Year" ng-class="ctrl.selectedTemplate === \'TY\' ? \'md-primary md-raised\' : \'\'" event-key="TY">This Year</span><span class="md-button" aria-label="Last Year" ng-class="ctrl.selectedTemplate === \'LY\' ? \'md-primary md-raised\' : \'\'" event-key="LY">Last Year</span></div></div><div class="hide-gt-sm" layout="column" layout-padding><md-input-container><label>Date Range Template</label><md-select md-container-class="md-date-range-picker__select" class="md-block" placeholder="Custom Date Range" ng-model="ctrl.selectedTemplate"><md-option value=""></md-option><md-option aria-label="Today" value="TD" ng-click="ctrl.handleClickSelectToday()">Today</md-option><md-option aria-label="Yesterday" value="YD" ng-click="ctrl.handleClickSelectYesterday()">Yesterday</md-option><md-option aria-label="This Week" value="TW" ng-click="ctrl.handleClickSelectThisWeek()">This Week</md-option><md-option aria-label="Last Week" value="LW" ng-click="ctrl.handleClickSelectLastWeek()">Last Week</md-option><md-option aria-label="This Month" value="TM" ng-click="ctrl.handleClickSelectThisMonth()">This Month</md-option><md-option aria-label="Last Month" value="LM" ng-click="ctrl.handleClickSelectLastMonth()">Last Month</md-option><md-option aria-label="This Year" value="TY" ng-click="ctrl.handleClickSelectThisYear()">This Year</md-option><md-option aria-label="Last Year" value="LY" ng-click="ctrl.handleClickSelectLastYear()">Last Year</md-option></md-select></md-input-container></div></div></div></div>',
            controllerAs: 'ctrl',
            bindToController: true,
            controller: mdDateRangePickerCtrl,
            link: function (scope, element, attributes, ctrl) {
                element.on('click', function (e) {
                    var eventKey = e.target.getAttribute('event-key'),
                        eventParam = e.target.getAttribute('event-param');
                    switch (eventKey) {
                        case 'prev':
                            ctrl.handleClickPrevMonth(e);
                            scope.$apply();
                            break;
                        case 'next':
                            ctrl.handleClickNextMonth(e);
                            scope.$apply();
                            break;
                        case 'date1':
                            if (ctrl.handleClickDate(e, ctrl.dates[eventParam])) {
                                scope.$apply();
                                ctrl.triggerChange();
                            } else {
                                scope.$apply();
                            }
                            break;
                        case 'date2':
                            if (ctrl.handleClickDate(e, ctrl.dates2[eventParam])) {
                                scope.$apply();
                                ctrl.triggerChange();
                            } else {
                                scope.$apply();
                            }
                            break;
                        case 'TD':
                            ctrl.handleClickSelectToday();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'YD':
                            ctrl.handleClickSelectYesterday();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'TW':
                            ctrl.handleClickSelectThisWeek();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'LW':
                            ctrl.handleClickSelectLastWeek();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'TM':
                            ctrl.handleClickSelectThisMonth();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'LM':
                            ctrl.handleClickSelectLastMonth();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'TY':
                            ctrl.handleClickSelectThisYear();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        case 'LY':
                            ctrl.handleClickSelectLastYear();
                            scope.$apply();
                            ctrl.triggerChange();
                            break;
                        default:
                            break;
                    }
                });

                ctrl.triggerChange = function triggerChange() {
                    if (ctrl.mdOnSelect && typeof ctrl.mdOnSelect === 'function') {
                        ctrl.mdOnSelect();
                    }
                };
            }
        };
        return directive
    }

    mdDateRangePickerCtrl.$inject = ['$scope', '$filter'];
    function mdDateRangePickerCtrl($scope, $filter) {
        var ctrl = this, NUMBER_OF_MONTH_TO_DISPLAY = 2,
            SELECTION_TEMPLATES = {
                'TD': 'Today',
                'YD': 'Yesterday',
                'TW': 'This Week',
                'LW': 'Last Week',
                'TM': 'This Month',
                'LM': 'Last Month',
                'TY': 'This Year',
                'LY': 'Last Year'
            }, START_OF_WEEK = 1;
        this.isMenuContainer = false;
        this.days = [];
        this.label = 'Date range picker';
        this.dates = [];
        this.dates2 = [];
        this.firstDayOfWeek = this.firstDayOfWeek || START_OF_WEEK; // Configurable Attribute
        this.numberOfMonthToDisplay = 2;
        this.today = new Date();
        this.dateStart = this.dateStart || null;
        this.dateStart && this.dateStart.setHours(0, 0, 0, 0);
        this.dateEnd = this.dateEnd || null;
        this.dateEnd && this.dateStart.setHours(23, 59, 59, 999);
        this.firstDayOfMonth = this.dateStart ? new Date(this.dateStart.getFullYear(), this.dateStart.getMonth(), 1) : Date(this.today.getFullYear(), this.today.getMonth(), 1);
        this.lastDayOfMonth = this.dateStart ? new Date(this.dateStart.getFullYear(), this.dateStart.getMonth() + 1, 0) : Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
        this.activeDate = this.dateStart || this.today;
        this.activeDate2 = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 1);
        this.activeMonth = this.activeDate.getMonth();
        this.activeYear = this.activeDate.getFullYear();
        this.activeMonth2 = this.activeDate2.getMonth();
        this.activeYear2 = this.activeDate2.getFullYear();
        this.months = [];
        this.years = [];
        this.selectedTemplate = this.selectedTemplate;

        this.inCurrentMonth = inCurrentMonth;
        this.isToday = isToday;
        this.handleClickDate = handleClickDate;
        this.inSelectedDateRange = inSelectedDateRange;
        this.isSelectedStartDate = isSelectedStartDate;
        this.isSelectedEndDate = isSelectedEndDate;

        this.updateActiveDate = updateActiveDate;
        this.selectedDateText = selectedDateText;
        this.focusToDate = focusToDate;

        this.handleClickNextMonth = handleClickNextMonth;
        this.handleClickPrevMonth = handleClickPrevMonth;

        this.handleClickSelectToday = handleClickSelectToday;
        this.handleClickSelectYesterday = handleClickSelectYesterday;
        this.handleClickSelectThisWeek = handleClickSelectThisWeek;
        this.handleClickSelectLastWeek = handleClickSelectLastWeek;
        this.handleClickSelectThisMonth = handleClickSelectThisMonth;
        this.handleClickSelectLastMonth = handleClickSelectLastMonth;
        this.handleClickSelectThisYear = handleClickSelectThisYear;
        this.handleClickSelectLastYear = handleClickSelectLastYear;

        init();

        function init() {
            var mctr = 0;
            if (ctrl.selectedTemplate) {
                switch (ctrl.selectedTemplate) {
                    case 'TD':
                        ctrl.handleClickSelectToday();
                        break;
                    case 'YD':
                        ctrl.handleClickSelectYesterday();
                        break;
                    case 'TW':
                        ctrl.handleClickSelectThisWeek();
                        break;
                    case 'LW':
                        ctrl.handleClickSelectLastWeek();
                        break;
                    case 'TM':
                        ctrl.handleClickSelectThisMonth();
                        break;
                    case 'LM':
                        ctrl.handleClickSelectLastMonth();
                        break;
                    case 'TY':
                        ctrl.handleClickSelectThisYear();
                        break;
                    case 'LY':
                        ctrl.handleClickSelectLastYear();
                        break;
                    default:
                        ctrl.selectedTemplate = '';
                        ctrl.selectedTemplateName = ctrl.selectedDateText();
                        ctrl.updateActiveDate();
                        break;
                }
            } else {
                ctrl.selectedTemplate = '';
                ctrl.selectedTemplateName = ctrl.selectedDateText();
                ctrl.updateActiveDate();
            }
            /**
             * Generate Days of Week Names
             * Fact: January 1st of 2017 is Sunday
             */
            var w = new Date(2017, 0, 1);
            ctrl.days = [];
            for (mctr = 0; mctr < 7; mctr++) {
                //add ctrl.firstDayOfWeek to set the first Day of week e.g. 0 = Sunday, 1 = Monday 
                w.setDate(mctr + 1 + ctrl.firstDayOfWeek);
                ctrl.days.push({ id: mctr, name: $filter('date')(w, 'EEE') });
            }
            /**
             * Generate Month Names, Might depend on localization
            */
            var m = new Date();
            m.setDate(1);
            ctrl.months = [];
            for (mctr = 0; mctr < 12; mctr++) {
                m.setMonth(mctr);
                ctrl.months.push({ id: mctr, name: $filter('date')(m, 'MMMM') });
            }
            /**
             * Generate Year Selection
            */
            var y = ctrl.activeYear, yctr = 0;
            ctrl.years = [];
            for (yctr = y - 10; yctr < y + 10; yctr++) {
                ctrl.years.push({ id: yctr, name: yctr })
            }
        }

        /**
         * Fill the Calendar Dates
         */
        function fillDateGrid(currentDate) {

            var dates = [],
                monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
                calendarStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - (monthStartDate.getDay() - ctrl.firstDayOfWeek)),
                calendarEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 7 - (monthEndDate.getDay() - ctrl.firstDayOfWeek)),
                calendar = calendarStartDate;
            while (calendar < calendarEndDate) {
                dates.push(calendar);
                calendar = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate() + 1);
            }
            return dates;
        }

        /**
         * Diff 2 Dates by Day Differences
         * date1 < date2 return positive integer
         * date1 = date2 return 0
         * date1 > date2 return negative integer
         */
        function getDateDiff(date1, date2) {
            if(!date1 || !date2) return;
            var _d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
                _d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return _d2 - _d1;
        }

        /**
         * return Day Name in a week
         */
        function getDayName(day, firstDayOfWeek) {
            var weekday = new Array(7), div = firstDayOfWeek || 0;
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";
            return weekday[day + div % 7];
        }

        /**
         * Events
         */

        function inCurrentMonth(date, isSecondMonth) {
            return !isSecondMonth ?
                date.getMonth() === ctrl.activeMonth :
                date.getMonth() === ctrl.activeMonth2;
        }

        function handleClickDate($event, date) {
            var changed = false;
            if (getDateDiff(ctrl.dateStart, ctrl.dateEnd) === 0) {
                if (getDateDiff(ctrl.dateStart, date) > 0) {
                    ctrl.dateEnd = date;
                } else {
                    ctrl.dateStart = date;
                }
                changed = true;
            } else {
                ctrl.dateStart = date;
                ctrl.dateEnd = date;
            }
            ctrl.selectedTemplate = false;
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            return changed;
        }

        function inSelectedDateRange(date) {
            return ctrl.dateStart &&  ctrl.dateEnd 
                ? getDateDiff(ctrl.dateStart, date) >= 0 && 0 <= getDateDiff(date, ctrl.dateEnd) 
                : false;
        }

        function updateActiveDate(isSecondMonth) {
            var d = new Date(this.activeYear, this.activeMonth, 1),
                d2 = new Date(this.activeYear2, this.activeMonth2, 1);
            if (isSecondMonth) {
                d = new Date(this.activeYear2, this.activeMonth2 - 1, 1);
                this.activeYear = d.getFullYear();
                this.activeMonth = d.getMonth();
            } else {
                d2 = new Date(this.activeYear, this.activeMonth + 1, 1);
                this.activeYear2 = d2.getFullYear();
                this.activeMonth2 = d2.getMonth();
            }
            ctrl.focusToDate(d);
        }

        function handleClickNextMonth($event) {
            var d = new Date(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth() + 1, 1);
            ctrl.focusToDate(d);
        }

        function handleClickPrevMonth($event) {
            var d = new Date(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth() - 1, 1);
            ctrl.focusToDate(d);
        }

        function handleClickSelectToday() {
            var d = new Date(), d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());

            ctrl.dateStart = d1;
            ctrl.dateEnd = d1;
            ctrl.selectedTemplate = 'TD';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectYesterday() {
            var d = new Date(), d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d1;
            ctrl.selectedTemplate = 'YD';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }


        function handleClickSelectThisWeek() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate()),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() - ctrl.firstDayOfWeek)),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + ctrl.firstDayOfWeek));

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TW';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectLastWeek() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate() - 7),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() - ctrl.firstDayOfWeek)),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + ctrl.firstDayOfWeek));

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'LW';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }


        function handleClickSelectThisMonth() {
            var d = new Date(),
                d1 = new Date(d.getFullYear(), d.getMonth(), 1),
                d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TM';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectLastMonth() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth() - 1, p.getDate()),
                d1 = new Date(d.getFullYear(), d.getMonth(), 1),
                d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'LM';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectThisYear() {
            var d = new Date(),
                d1 = new Date(d.getFullYear(), 0, 1),
                d2 = new Date(d.getFullYear(), 11, 31);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TY';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d1);
        }

        function handleClickSelectLastYear() {
            var d = new Date(),
                d1 = new Date(d.getFullYear() - 1, 0, 1),
                d2 = new Date(d.getFullYear() - 1, 11, 31);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'LY';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d1);
        }

        function isSelectedStartDate(date) {
            return getDateDiff(ctrl.dateStart, date) === 0;
        }

        function isSelectedEndDate(date) {
            return getDateDiff(ctrl.dateEnd, date) === 0;
        }

        function isToday(date) {
            return getDateDiff(date, new Date()) === 0;
        }

        function selectedDateText() {
            if(!ctrl.dateStart || !ctrl.dateEnd){
                return '';
            }else if (!ctrl.selectedTemplate) {
                if (getDateDiff(ctrl.dateStart, ctrl.dateEnd) === 0) {
                    return $filter('date')(ctrl.dateStart, 'dd MMM yyyy');
                } else {
                    return $filter('date')(
                        ctrl.dateStart,
                        'dd' + (ctrl.dateStart.getMonth() !== ctrl.dateEnd.getMonth() || ctrl.dateStart.getFullYear() !== ctrl.dateEnd.getFullYear() ? ' MMM' : '') + (ctrl.dateStart.getFullYear() !== ctrl.dateEnd.getFullYear() ? ' yyyy' : '')
                    ) + ' - ' +
                        $filter('date')(
                            ctrl.dateEnd,
                            'dd MMM yyyy'
                        );
                }
            } else {
                return SELECTION_TEMPLATES[ctrl.selectedTemplate];
            }
        }

        function focusToDate(d) {
            var d2 = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            ctrl.activeDate = d;
            ctrl.activeMonth = d.getMonth();
            ctrl.activeYear = d.getFullYear();

            ctrl.activeDate2 = d2;
            ctrl.activeMonth2 = d2.getMonth();
            ctrl.activeYear2 = d2.getFullYear();

            ctrl.dates = fillDateGrid(d);
            ctrl.dates2 = fillDateGrid(d2);
        }
    }

    function mdDateRangeDirective() {
        return {
            scope: {
                ngModel: '=ngModel',
                showTemplate: '=',
                autoConfirm: '=?',
                placeholder: '@',
                firstDayOfWeek: '@'
            },
            template: ['<md-menu>',
                '<span class="md-select-value" ng-click="$mdOpenMenu($event)">',
                '  <span>{{ctrl.ngModel.selectedTemplateName || ctrl.placeholder}}</span>',
                '  <span class="md-select-icon" aria-hidden="true"></span>',
                '</span>',
                '<md-menu-content class="md-custom-menu-content" style="max-height: none; height: auto; padding: 0;" width="4">',
                '    <span style="text-align: left; padding: 12px 20px 0 20px; text-transform: uppercase" disabled>{{ctrl.selectedTemplateName}}</span>',
                '    <md-date-range-picker show-template="true" first-day-of-week="ctrl.firstDayOfWeek" ',
                '     md-on-select="ctrl.autoConfirm && ctrl.ok()" ',
                '     date-start="ctrl.dateStart" ',
                '     date-end="ctrl.dateEnd" ',
                '     show-template="ctrl.showTemplate" ',
                '     selected-template="ctrl.selectedTemplate" ',
                '     selected-template-name="ctrl.selectedTemplateName"></md-date-range-picker>',
                '<p ng-if="!ctrl.autoConfirm" layout="row" layout-align="end center">',
                '<md-button ng-click="ctrl.cancel()">Cancel</md-button>',
                '<md-button class="md-raised md-primary" ng-click="ctrl.ok()">Ok</md-button>',
                '</p>',
                '</md-menu-content>',
                '</md-menu>'].join(''),
            controllerAs: 'ctrl',
            bindToController: true,
            controller: ['$scope', '$mdMenu', function ($scope, $mdMenu) {
                var self = this;
                /**
                 * Copy Model so that model will only update if dateEnd modified
                 */
                $scope.$watch(function () {
                    return JSON.stringify(self.ngModel);
                }, function (newval) {
                    if(self.ngModel){
                        self.selectedTemplateName = self.ngModel.selectedTemplateName;
                        self.selectedTemplate = self.ngModel.selectedTemplate;
                        self.dateStart = self.ngModel.dateStart;
                        self.dateEnd = self.ngModel.dateEnd;
                    }
                });
                if(self.ngModel){
                    self.selectedTemplateName = self.ngModel.selectedTemplateName;
                    self.selectedTemplate = self.ngModel.selectedTemplate;
                    self.dateStart = self.ngModel.dateStart;
                    self.dateEnd = self.ngModel.dateEnd;
                    self.firstDayOfWeek = self.firstDayOfWeek || 1;
                }
                self.ok = function ok() {
                    if(self.ngModel){
                        self.ngModel.selectedTemplateName = self.selectedTemplateName;
                        self.ngModel.selectedTemplate = self.selectedTemplate;
                        self.ngModel.dateStart = self.dateStart;
                        self.ngModel.dateEnd = self.dateEnd;
                        self.ngModel.dateStart.setHours(0, 0, 0, 0);
                        self.ngModel.dateEnd.setHours(23, 59, 59, 999);
                    }
                    $mdMenu.hide();
                }
                self.cancel = function cancel() {
                    $mdMenu.hide();
                }
            }]
        };
    }

    mdDateRangePickerService.$inject = ['$q', '$mdDialog'];
    function mdDateRangePickerService($q, $mdDialog) {
        var service = this;

        service.show = show;

        function show(config) {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    locals: {
                        mdDateRangePickerServiceModel: angular.copy(config.model)
                    },
                    controller: ['$scope', 'mdDateRangePickerServiceModel', function ($scope, mdDateRangePickerServiceModel) {
                        var vm = this;
                        vm.model = mdDateRangePickerServiceModel || {};
                        vm.model.selectedTemplateName = vm.model.selectedTemplateName || '';
                        vm.ok = function () {
                            vm.model.dateStart.setHours(0, 0, 0, 0);
                            vm.model.dateEnd.setHours(23, 59, 59, 999);
                            $mdDialog.hide(vm.model);
                        }
                        vm.cancel = function () {
                            $mdDialog.hide(false);
                        }
                    }],
                    controllerAs: 'vm',
                    template: ['<md-dialog aria-label="Date Range Picker">',
                        '<md-toolbar class="md-primary" layout="row" layout-align="start center">',
                        '<md-button aria-label="Date Range Picker" class="md-icon-button" aria-hidden="true" ng-disabled="true">',
                        '<md-icon md-svg-icon="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExSDd2Mmgydi0yem00IDBoLTJ2Mmgydi0yem00IDBoLTJ2Mmgydi0yem0yLTdoLTFWMmgtMnYySDhWMkg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAyMGMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOWgxNHYxMXoiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"></md-icon>',
                        '</md-button>',
                        '<span class="md-toolbar-tools">{{vm.model.selectedTemplateName}}</span>',
                        '</md-toolbar>',
                        '<md-dialog-content>',
                        '<md-date-range-picker ',
                        'date-start="vm.model.dateStart" ',
                        'date-end="vm.model.dateEnd" ',
                        'show-template="vm.model.showTemplate" ',
                        'selected-template="vm.model.selectedTemplate" ',
                        'selected-template-name="vm.model.selectedTemplateName"',
                        '>',
                        '</md-date-range-picker>',
                        '</md-dialog-content>',
                        '<md-dialog-actions layout="row" layout-align="end center">',
                        '<md-button ng-click="vm.cancel()">Cancel</md-button>',
                        '<md-button class="md-raised md-primary" ng-click="vm.ok()">Ok</md-button>',
                        '</md-dialog-actions>',
                        '</md-dialog>'].join(''),
                    parent: angular.element(document.body),
                    targetEvent: config.targetEvent,
                    clickOutsideToClose: true,
                    fullscreen: config.model.fullscreen
                })
                    .then(function (result) {
                        resolve(result);
                    }, function () {
                        reject(false);
                    });
            });
        }
    }

} (window, angular));
