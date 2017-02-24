/*
* Name: md-date-range-picker
* Version: 0.3.2
* Build Date: 2/24/2017
* Author: roel barreto <greatcodeideas@gmail.com>
*/
(function (window, angular) {

    angular
        .module('ngMaterialDateRangePicker', ['ngMaterial'])
        .directive('mdDateRangePicker', mdDateRangePickerDirective)
        .directive('mdDateRange', mdDateRangeDirective)
        .controller('mdDateRangePickerCtrl', mdDateRangePickerCtrl)
        .service('$mdDateRangePicker', mdDateRangePickerService);
    /**
     * scope here is non-bi-directional
     */
    function mdDateRangePickerDirective() {
        var directive = {
            scope: {
                selectedTemplate: '=',
                selectedTemplateName: '=',
                dateStart: '=?',
                dateEnd: '=?',
                firstDayOfWeek: '=?',
                showTemplate: '=?',
                mdOnSelect: '&?'
            },
            template: '<div class="md-date-range-picker md-whiteframe-1dp"><div layout="column"><div layout="row" layout-margin><div class="md-date-range-picker__calendar-wrapper"><div class="md-date-range-picker__month-year" layout="row" layout-align="center center"><div flex layout="column" layout-align="center center"><span aria-label="Previous Month" class="md-button md-icon-button" event-key="prev"><md-icon md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><md-select md-container-class="md-date-range-picker__select" md-on-close="updateActiveDate()" ng-model="activeMonth" placeholder="Month" class="md-no-underline"><md-option ng-value="::month.id" ng-repeat="month in months" ng-bind="::month.name"></md-option></md-select><md-select md-container-class="md-date-range-picker__select" md-on-close="updateActiveDate()" ng-model="activeYear" placeholder="Year" class="md-no-underline"><md-option ng-value="::year.id" ng-repeat="year in years" ng-bind="::year.name"></md-option></md-select><div flex layout="column" layout-align="center center" class="hide-gt-sm show-sm show-xs"><span aria-label="Next Month" class="md-icon-button md-button" event-key="next"><md-icon style="transform: rotate(-180deg)" md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><div flex layout="column" layout-align="center center" class="hide-sm hide-xs show-gt-sm"><span aria-label="Next Month" ng-disabled="true" aria-hidden="true" class="md-icon-button md-button"><md-icon></md-icon></span></div></div><div class="md-date-range-picker__week" style="font-size: 0"><span class="md-date-range-picker__calendar__grid" ng-repeat="day in days">{{::day.name}}</span></div><div class="md-date-range-picker__calendar"><span ng-repeat="date in dates" class="md-date-range-picker__calendar__grid" ng-class="{\'md-date-range-picker__calendar__selected\':inSelectedDateRange(date), \'md-date-range-picker__calendar__start\':isSelectedStartDate(date), \'md-date-range-picker__calendar__end\':isSelectedEndDate(date), \'md-date-range-picker__calendar__not-in-active-month\': !inCurrentMonth(date), \'md-date-range-picker__calendar__today\' : isToday(date) }" event-key="date1" event-param="{{$index}}"><span class="md-date-range-picker__calendar__selection" ng-bind="{{::date.getDate()}}"></span></span></div></div><div class="md-date-range-picker__calendar-wrapper hide-sm hide-xs show-gt-sm"><div class="md-date-range-picker__month-year" layout="row" layout-align="center center"><div flex layout="column" layout-align="center center" style="visibility: hidden"><span aria-label="Previous Month" class="md-button md-icon-button" event-key="prev"><md-icon md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div><md-select md-container-class="md-date-range-picker__select" md-on-close="updateActiveDate(true)" ng-model="activeMonth2" placeholder="Month" class="md-no-underline"><md-option ng-value="::month.id" ng-repeat="month in months" ng-bind="::month.name"></md-option></md-select><md-select md-container-class="md-date-range-picker__select" md-on-close="updateActiveDate(true)" ng-model="activeYear2" placeholder="Year" class="md-no-underline"><md-option ng-value="::year.id" ng-repeat="year in years" ng-bind="::year.name"></md-option></md-select><div flex layout="column" layout-align="center center"><span aria-label="Next Month" class="md-icon-button md-button" event-key="next"><md-icon style="transform: rotate(-180deg)" md-svg-src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4="></md-icon></span></div></div><div class="md-date-range-picker__week" style="font-size: 0"><span class="md-date-range-picker__calendar__grid" ng-repeat="day in days">{{::day.name}}</span></div><div class="md-date-range-picker__calendar"><span ng-repeat="date in dates2" class="md-date-range-picker__calendar__grid" ng-class="{\'md-date-range-picker__calendar__selected\':inSelectedDateRange(date), \'md-date-range-picker__calendar__start\':isSelectedStartDate(date), \'md-date-range-picker__calendar__end\':isSelectedEndDate(date), \'md-date-range-picker__calendar__not-in-active-month\': !inCurrentMonth(date, true), \'md-date-range-picker__calendar__today\' : isToday(date) }" event-key="date2" event-param="{{$index}}"><span class="md-date-range-picker__calendar__selection" ng-bind="{{::date.getDate()}}"></span></span></div></div></div><div class="md-date-range-picker__templates" ng-if="showTemplate"><div class="hide show-gt-sm" layout="row"><div flex layout="column"><span class="md-button" aria-label="Today" ng-class="selectedTemplate === \'TD\' ? \'md-primary md-raised\' : \'\'" event-key="TD">Today</span><span class="md-button" aria-label="Yesterday" ng-class="selectedTemplate === \'YD\' ? \'md-primary md-raised\' : \'\'" event-key="YD">Yesterday</span></div><div flex layout="column"><span class="md-button" aria-label="This Week" ng-class="selectedTemplate === \'TW\' ? \'md-primary md-raised\' : \'\'" event-key="TW">This Week</span><span class="md-button" aria-label="Last Week" ng-class="selectedTemplate === \'LW\' ? \'md-primary md-raised\' : \'\'" event-key="LW">Last Week</span></div><div flex layout="column"><span class="md-button" aria-label="This Month" ng-class="selectedTemplate === \'TM\' ? \'md-primary md-raised\' : \'\'" event-key="TM">This Month</span><span class="md-button" aria-label="Last Month" ng-class="selectedTemplate === \'LM\' ? \'md-primary md-raised\' : \'\'" event-key="LM">Last Month</span></div><div flex layout="column"><span class="md-button" aria-label="This Year" ng-class="selectedTemplate === \'TY\' ? \'md-primary md-raised\' : \'\'" event-key="TY">This Year</span><span class="md-button" aria-label="Last Year" ng-class="selectedTemplate === \'LY\' ? \'md-primary md-raised\' : \'\'" event-key="LY">Last Year</span></div></div><div class="hide-gt-sm" layout="column" layout-padding><md-input-container><label>Date Range Template</label><md-select md-container-class="md-date-range-picker__select" class="md-block" placeholder="Custom Date Range" ng-model="selectedTemplate"><md-option value=""></md-option><md-option aria-label="Today" value="TD" ng-click="handleClickSelectToday()">Today</md-option><md-option aria-label="Yesterday" value="YD" ng-click="handleClickSelectYesterday()">Yesterday</md-option><md-option aria-label="This Week" value="TW" ng-click="handleClickSelectThisWeek()">This Week</md-option><md-option aria-label="Last Week" value="LW" ng-click="handleClickSelectLastWeek()">Last Week</md-option><md-option aria-label="This Month" value="TM" ng-click="handleClickSelectThisMonth()">This Month</md-option><md-option aria-label="Last Month" value="LM" ng-click="handleClickSelectLastMonth()">Last Month</md-option><md-option aria-label="This Year" value="TY" ng-click="handleClickSelectThisYear()">This Year</md-option><md-option aria-label="Last Year" value="LY" ng-click="handleClickSelectLastYear()">Last Year</md-option></md-select></md-input-container></div></div></div></div>',
            controller: 'mdDateRangePickerCtrl',
            link: function (scope, element, attributes, ctrl) {
                element.on('click', function (e) {
                    var eventKey = e.target.getAttribute('event-key'),
                        eventParam = e.target.getAttribute('event-param');
                    switch (eventKey) {
                        case 'prev':
                            scope.handleClickPrevMonth(e);
                            scope.$apply();
                            break;
                        case 'next':
                            scope.handleClickNextMonth(e);
                            scope.$apply();
                            break;
                        case 'date1':
                            if (scope.handleClickDate(e, scope.dates[eventParam])) {
                                scope.$apply();
                                scope.triggerChange();
                            } else {
                                scope.$apply();
                            }
                            break;
                        case 'date2':
                            if (scope.handleClickDate(e, scope.dates2[eventParam])) {
                                scope.$apply();
                                scope.triggerChange();
                            } else {
                                scope.$apply();
                            }
                            break;
                        case 'TD':
                            scope.handleClickSelectToday();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'YD':
                            scope.handleClickSelectYesterday();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'TW':
                            scope.handleClickSelectThisWeek();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'LW':
                            scope.handleClickSelectLastWeek();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'TM':
                            scope.handleClickSelectThisMonth();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'LM':
                            scope.handleClickSelectLastMonth();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'TY':
                            scope.handleClickSelectThisYear();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        case 'LY':
                            scope.handleClickSelectLastYear();
                            scope.$apply();
                            scope.triggerChange();
                            break;
                        default:
                            break;
                    }
                });

                scope.triggerChange = function triggerChange() {
                    if (scope.mdOnSelect && typeof scope.mdOnSelect === 'function') {
                        scope.mdOnSelect();
                    }
                };
            }
        };
        return directive
    }

    mdDateRangePickerCtrl.$inject = ['$scope', '$filter'];
    function mdDateRangePickerCtrl($scope, $filter) {
        var ctrl = $scope, NUMBER_OF_MONTH_TO_DISPLAY = 2,
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
        $scope.isMenuContainer = false;
        $scope.days = [];
        $scope.label = 'Date range picker';
        $scope.dates = [];
        $scope.dates2 = [];
        $scope.numberOfMonthToDisplay = 2;
        $scope.today = new Date();
        $scope.dateStart && $scope.dateStart.setHours(0, 0, 0, 0);
        $scope.dateEnd && $scope.dateStart.setHours(23, 59, 59, 999);
        $scope.firstDayOfMonth = $scope.dateStart ? new Date($scope.dateStart.getFullYear(), $scope.dateStart.getMonth(), 1) : Date($scope.today.getFullYear(), $scope.today.getMonth(), 1);
        $scope.lastDayOfMonth = $scope.dateStart ? new Date($scope.dateStart.getFullYear(), $scope.dateStart.getMonth() + 1, 0) : Date($scope.today.getFullYear(), $scope.today.getMonth() + 1, 0);
        $scope.activeDate = $scope.dateStart || $scope.today;
        $scope.activeDate2 = new Date($scope.activeDate.getFullYear(), $scope.activeDate.getMonth() + 1, 1);
        $scope.activeMonth = $scope.activeDate.getMonth();
        $scope.activeYear = $scope.activeDate.getFullYear();
        $scope.activeMonth2 = $scope.activeDate2.getMonth();
        $scope.activeYear2 = $scope.activeDate2.getFullYear();
        $scope.months = [];
        $scope.years = [];

        $scope.inCurrentMonth = inCurrentMonth;
        $scope.isToday = isToday;
        $scope.handleClickDate = handleClickDate;
        $scope.inSelectedDateRange = inSelectedDateRange;
        $scope.isSelectedStartDate = isSelectedStartDate;
        $scope.isSelectedEndDate = isSelectedEndDate;

        $scope.updateActiveDate = updateActiveDate;
        $scope.selectedDateText = selectedDateText;
        $scope.focusToDate = focusToDate;

        $scope.handleClickNextMonth = handleClickNextMonth;
        $scope.handleClickPrevMonth = handleClickPrevMonth;

        $scope.handleClickSelectToday = handleClickSelectToday;
        $scope.handleClickSelectYesterday = handleClickSelectYesterday;
        $scope.handleClickSelectThisWeek = handleClickSelectThisWeek;
        $scope.handleClickSelectLastWeek = handleClickSelectLastWeek;
        $scope.handleClickSelectThisMonth = handleClickSelectThisMonth;
        $scope.handleClickSelectLastMonth = handleClickSelectLastMonth;
        $scope.handleClickSelectThisYear = handleClickSelectThisYear;
        $scope.handleClickSelectLastYear = handleClickSelectLastYear;

        init();

        function init() {
            var mctr = 0;
            if ($scope.selectedTemplate) {
                switch ($scope.selectedTemplate) {
                    case 'TD':
                        $scope.handleClickSelectToday();
                        break;
                    case 'YD':
                        $scope.handleClickSelectYesterday();
                        break;
                    case 'TW':
                        $scope.handleClickSelectThisWeek();
                        break;
                    case 'LW':
                        $scope.handleClickSelectLastWeek();
                        break;
                    case 'TM':
                        $scope.handleClickSelectThisMonth();
                        break;
                    case 'LM':
                        $scope.handleClickSelectLastMonth();
                        break;
                    case 'TY':
                        $scope.handleClickSelectThisYear();
                        break;
                    case 'LY':
                        $scope.handleClickSelectLastYear();
                        break;
                    default:
                        $scope.selectedTemplate = '';
                        $scope.selectedTemplateName = $scope.selectedDateText();
                        break;
                }
                $scope.updateActiveDate();
            } else {
                $scope.selectedTemplate = '';
                $scope.selectedTemplateName = $scope.selectedDateText();
                $scope.updateActiveDate();
            }

            $scope.$watch('selectedTemplate', function (next, prev) {
                if (next !== prev && $scope.dateStart && !$scope.inCurrentMonth($scope.dateStart) && !$scope.inCurrentMonth($scope.dateStart, true)) {
                    $scope.focusToDate($scope.dateStart);
                }
            });
            $scope.$watch('dateStart', function (next, prev) {
                if (next !== prev && $scope.dateStart && !$scope.inCurrentMonth($scope.dateStart) && !$scope.inCurrentMonth($scope.dateStart, true)) {
                    $scope.focusToDate($scope.dateStart);
                }
            });

            /**
             * Generate Days of Week Names
             * Fact: January 1st of 2017 is Sunday
             */
            var w = new Date(2017, 0, 1);
            $scope.days = [];
            for (mctr = 0; mctr < 7; mctr++) {
                //add $scope.firstDayOfWeek to set the first Day of week e.g. -1 = Sunday, 0 = Monday 
                w.setDate(mctr + 1 + getFirstDayOfWeek());
                $scope.days.push({ id: mctr, name: $filter('date')(w, 'EEE') });
            }
            /**
             * Generate Month Names, Might depend on localization
            */
            var m = new Date();
            m.setDate(1);
            $scope.months = [];
            for (mctr = 0; mctr < 12; mctr++) {
                m.setMonth(mctr);
                $scope.months.push({ id: mctr, name: $filter('date')(m, 'MMMM') });
            }
            /**
             * Generate Year Selection
            */
            var y = $scope.activeYear, yctr = 0;
            $scope.years = [];
            for (yctr = y - 10; yctr < y + 10; yctr++) {
                $scope.years.push({ id: yctr, name: yctr })
            }
        }

        function getFirstDayOfWeek() {
            if ([undefined, null, '', NaN].indexOf($scope.firstDayOfWeek) !== -1) {
                return START_OF_WEEK;
            }
            return $scope.firstDayOfWeek;
        }
        /**
         * Fill the Calendar Dates
         */
        function fillDateGrid(currentDate) {

            var dates = [],
                monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
                calendarStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - (monthStartDate.getDay() - getFirstDayOfWeek())),
                calendarEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 7 - (monthEndDate.getDay() - getFirstDayOfWeek())),
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
            if (!date1 || !date2) return;
            var _d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
                _d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return _d2 - _d1;
        }

        /**
         * return Day Name in a week
         */
        function getDayName(day) {
            var weekday = new Array(7), div = getFirstDayOfWeek();
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
                date.getMonth() === $scope.activeMonth :
                date.getMonth() === $scope.activeMonth2;
        }

        function handleClickDate($event, date) {
            var changed = false;
            if (getDateDiff($scope.dateStart, $scope.dateEnd) === 0) {
                if (getDateDiff($scope.dateStart, date) > 0) {
                    $scope.dateEnd = date;
                } else {
                    $scope.dateStart = date;
                }
                changed = true;
            } else {
                $scope.dateStart = date;
                $scope.dateEnd = date;
            }
            $scope.selectedTemplate = false;
            $scope.selectedTemplateName = $scope.selectedDateText();
            return changed;
        }

        function inSelectedDateRange(date) {
            return $scope.dateStart && $scope.dateEnd
                ? getDateDiff($scope.dateStart, date) >= 0 && 0 <= getDateDiff(date, $scope.dateEnd)
                : false;
        }

        function updateActiveDate(isSecondMonth) {
            var d = new Date($scope.activeYear, $scope.activeMonth, 1),
                d2 = new Date($scope.activeYear2, $scope.activeMonth2, 1);
            if (isSecondMonth) {
                d = new Date($scope.activeYear2, $scope.activeMonth2 - 1, 1);
                $scope.activeYear = d.getFullYear();
                $scope.activeMonth = d.getMonth();
            } else {
                d2 = new Date($scope.activeYear, $scope.activeMonth + 1, 1);
                $scope.activeYear2 = d2.getFullYear();
                $scope.activeMonth2 = d2.getMonth();
            }
            $scope.focusToDate(d);
        }

        function handleClickNextMonth($event) {
            var d = new Date($scope.activeDate.getFullYear(), $scope.activeDate.getMonth() + 1, 1);
            $scope.focusToDate(d);
        }

        function handleClickPrevMonth($event) {
            var d = new Date($scope.activeDate.getFullYear(), $scope.activeDate.getMonth() - 1, 1);
            $scope.focusToDate(d);
        }

        function handleClickSelectToday() {
            var d = new Date(), d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());

            $scope.dateStart = d1;
            $scope.dateEnd = d1;
            $scope.selectedTemplate = 'TD';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }

        function handleClickSelectYesterday() {
            var d = new Date(), d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

            $scope.dateStart = d1;
            $scope.dateEnd = d1;
            $scope.selectedTemplate = 'YD';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }


        function handleClickSelectThisWeek() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate()),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() - getFirstDayOfWeek())),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + getFirstDayOfWeek()));

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'TW';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }

        function handleClickSelectLastWeek() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate() - 7),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() - getFirstDayOfWeek())),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + getFirstDayOfWeek()));

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'LW';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }


        function handleClickSelectThisMonth() {
            var d = new Date(),
                d1 = new Date(d.getFullYear(), d.getMonth(), 1),
                d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'TM';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }

        function handleClickSelectLastMonth() {
            var p = new Date(),
                d = new Date(p.getFullYear(), p.getMonth() - 1, p.getDate()),
                d1 = new Date(d.getFullYear(), d.getMonth(), 1),
                d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'LM';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d);
        }

        function handleClickSelectThisYear() {
            var d = new Date(),
                d1 = new Date(d.getFullYear(), 0, 1),
                d2 = new Date(d.getFullYear(), 11, 31);

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'TY';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d1);
        }

        function handleClickSelectLastYear() {
            var d = new Date(),
                d1 = new Date(d.getFullYear() - 1, 0, 1),
                d2 = new Date(d.getFullYear() - 1, 11, 31);

            $scope.dateStart = d1;
            $scope.dateEnd = d2;
            $scope.selectedTemplate = 'LY';
            $scope.selectedTemplateName = $scope.selectedDateText();
            //$scope.focusToDate(d1);
        }

        function isSelectedStartDate(date) {
            return getDateDiff($scope.dateStart, date) === 0;
        }

        function isSelectedEndDate(date) {
            return getDateDiff($scope.dateEnd, date) === 0;
        }

        function isToday(date) {
            return getDateDiff(date, new Date()) === 0;
        }

        function selectedDateText() {
            if (!$scope.dateStart || !$scope.dateEnd) {
                return '';
            } else if (!$scope.selectedTemplate) {
                if (getDateDiff($scope.dateStart, $scope.dateEnd) === 0) {
                    return $filter('date')($scope.dateStart, 'dd MMM yyyy');
                } else {
                    return $filter('date')(
                        $scope.dateStart,
                        'dd' + ($scope.dateStart.getMonth() !== $scope.dateEnd.getMonth() || $scope.dateStart.getFullYear() !== $scope.dateEnd.getFullYear() ? ' MMM' : '') + ($scope.dateStart.getFullYear() !== $scope.dateEnd.getFullYear() ? ' yyyy' : '')
                    ) + ' - ' +
                        $filter('date')(
                            $scope.dateEnd,
                            'dd MMM yyyy'
                        );
                }
            } else {
                return SELECTION_TEMPLATES[$scope.selectedTemplate];
            }
        }

        function focusToDate(d) {
            var d2 = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            $scope.activeDate = d;
            $scope.activeMonth = d.getMonth();
            $scope.activeYear = d.getFullYear();

            $scope.activeDate2 = d2;
            $scope.activeMonth2 = d2.getMonth();
            $scope.activeYear2 = d2.getFullYear();

            $scope.dates = fillDateGrid(d);
            $scope.dates2 = fillDateGrid(d2);
        }
    }

    function mdDateRangeDirective() {
        return {
            scope: {
                ngModel: '=ngModel',
                showTemplate: '=',
                placeholder: '@',
                firstDayOfWeek: '@'
            },
            template: ['<md-menu>',
                '<span class="md-select-value" ng-click="$mdOpenMenu($event)">',
                '  <span>{{ngModel.selectedTemplateName || placeholder}}</span>',
                '  <span class="md-select-icon" aria-hidden="true"></span>',
                '</span>',
                '<md-menu-content class="md-custom-menu-content" style="max-height: none!important; height: auto!important; padding: 0!important;">',
                '    <span style="text-align: left; padding: 12px 20px 0 20px; text-transform: uppercase" disabled>{{ngModel.selectedTemplateName}}</span>',
                '    <md-date-range-picker show-template="true" first-day-of-week="firstDayOfWeek" ',
                '     md-on-select="autoConfirm && ok()" ',
                '     date-start="ngModel.dateStart" ',
                '     date-end="ngModel.dateEnd" ',
                '     show-template="ngModel.showTemplate" ',
                '     selected-template="ngModel.selectedTemplate" ',
                '     selected-template-name="ngModel.selectedTemplateName"></md-date-range-picker>',
                '<p ng-if="!autoConfirm" layout="row" layout-align="end center">',
                '<md-button class="md-raised md-primary" ng-click="ok()">Ok</md-button>',
                '</p>',
                '</md-menu-content>',
                '</md-menu>'].join(''),
            controller: ['$scope', '$mdMenu', function ($scope, $mdMenu) {
                $scope.ok = function ok() {
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
                        $scope.model = mdDateRangePickerServiceModel || {};
                        $scope.model.selectedTemplateName = $scope.model.selectedTemplateName || '';
                        $scope.ok = function () {
                            $scope.model.dateStart.setHours(0, 0, 0, 0);
                            $scope.model.dateEnd.setHours(23, 59, 59, 999);
                            $mdDialog.hide($scope.model);
                        }
                        $scope.cancel = function () {
                            $mdDialog.hide(false);
                        }
                    }],
                    template: ['<md-dialog aria-label="Date Range Picker">',
                        '<md-toolbar class="md-primary" layout="row" layout-align="start center">',
                        '<md-button aria-label="Date Range Picker" class="md-icon-button" aria-hidden="true" ng-disabled="true">',
                        '<md-icon md-svg-icon="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExSDd2Mmgydi0yem00IDBoLTJ2Mmgydi0yem00IDBoLTJ2Mmgydi0yem0yLTdoLTFWMmgtMnYySDhWMkg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAyMGMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOWgxNHYxMXoiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"></md-icon>',
                        '</md-button>',
                        '<span class="md-toolbar-tools">{{model.selectedTemplateName}}</span>',
                        '</md-toolbar>',
                        '<md-dialog-content>',
                        '<md-date-range-picker ',
                        'date-start="model.dateStart" ',
                        'date-end="model.dateEnd" ',
                        'show-template="model.showTemplate" ',
                        'selected-template="model.selectedTemplate" ',
                        'selected-template-name="model.selectedTemplateName"',
                        '>',
                        '</md-date-range-picker>',
                        '</md-dialog-content>',
                        '<md-dialog-actions layout="row" layout-align="end center">',
                        '<md-button ng-click="cancel()">Cancel</md-button>',
                        '<md-button class="md-raised md-primary" ng-click="ok()">Ok</md-button>',
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

}(window, angular));
