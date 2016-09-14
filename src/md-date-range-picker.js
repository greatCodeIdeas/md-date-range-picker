(function (window, angular) {

    angular
        .module('ngMaterialDateRangePicker', ['ngMaterial'])
        .directive('mdDateRangePicker', mdDateRangePicker)
        .service('$mdDateRangePicker', mdDateRangePickerService);
    /**
     * scope here is non-bi-directional
     */
    function mdDateRangePicker() {
        var directive = {
            scope: {
                selectedTemplate: '=',
                selectedTemplateName: '=',
                dateStart: '=',
                dateEnd: '=',
                firstDayOfWeek: '=?',
            },
            templateUrl: './md-date-range-picker.html',
            controllerAs: 'ctrl',
            bindToController: true,
            controller: mdDateRangePickerCtrl,
            link: mdDateRangePickerLink
        };
        return directive
    }

    mdDateRangePickerCtrl.$inject = ['$scope', '$filter'];
    function mdDateRangePickerCtrl($scope, $filter) {
        var ctrl = this, TODAY = new Date(), NUMBER_OF_MONTH_TO_DISPLAY = 2,
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
        this.days = [];
        this.label = 'Date range picker';
        this.dates = [];
        this.dates2 = [];
        this.firstDayOfWeek = this.firstDayOfWeek || START_OF_WEEK; // Configurable Attribute
        this.numberOfMonthToDisplay = 2;
        this.today = new Date();
        this.dateStart = this.dateStart || TODAY;
        this.dateEnd = this.dateEnd || TODAY;
        this.firstDayOfMonth = new Date(this.dateStart.getFullYear(), this.dateStart.getMonth(), 1);
        this.lastDayOfMonth = new Date(this.dateStart.getFullYear(), this.dateStart.getMonth() + 1, 0);
        this.activeDate = this.dateStart;
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
                        ctrl.updateActiveDate();
                        break;
                }
            } else {
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
            if (getDateDiff(ctrl.dateStart, ctrl.dateEnd) === 0) {
                if (getDateDiff(ctrl.dateStart, date) > 0) {
                    ctrl.dateEnd = date;
                } else {
                    ctrl.dateStart = date;
                }
            } else {
                ctrl.dateStart = date;
                ctrl.dateEnd = date;
            }
            ctrl.selectedTemplate = false;
            ctrl.selectedTemplateName = ctrl.selectedDateText();
        }

        function inSelectedDateRange(date) {
            return getDateDiff(ctrl.dateStart, date) >= 0 && 0 <= getDateDiff(date, ctrl.dateEnd);
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
            var d = TODAY, d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());

            ctrl.dateStart = d1;
            ctrl.dateEnd = d1;
            ctrl.selectedTemplate = 'TD';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectYesterday() {
            var d = TODAY, d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d1;
            ctrl.selectedTemplate = 'YD';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }


        function handleClickSelectThisWeek() {
            var p = TODAY,
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate()),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() -  ctrl.firstDayOfWeek)),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + ctrl.firstDayOfWeek));

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TW';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectLastWeek() {
            var p = TODAY,
                d = new Date(p.getFullYear(), p.getMonth(), p.getDate() - 7),
                d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() -  ctrl.firstDayOfWeek)),
                d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay() + ctrl.firstDayOfWeek));

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'LW';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }


        function handleClickSelectThisMonth() {
            var d = TODAY,
                d1 = new Date(d.getFullYear(), d.getMonth(), 1),
                d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TM';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d);
        }

        function handleClickSelectLastMonth() {
            var p = TODAY,
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
            var d = TODAY,
                d1 = new Date(d.getFullYear(), 0, 1),
                d2 = new Date(d.getFullYear(), 11, 31);

            ctrl.dateStart = d1;
            ctrl.dateEnd = d2;
            ctrl.selectedTemplate = 'TY';
            ctrl.selectedTemplateName = ctrl.selectedDateText();
            ctrl.focusToDate(d1);
        }

        function handleClickSelectLastYear() {
            var d = TODAY,
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
            return getDateDiff(date, TODAY) === 0;
        }

        function selectedDateText() {
            if (!ctrl.selectedTemplate) {
                if (getDateDiff(ctrl.dateStart, ctrl.dateEnd) === 0) {
                    return $filter('date')(ctrl.dateStart, 'dd MMM' + (ctrl.dateStart.getFullYear() !== TODAY.getFullYear() ? ' yyyy' : ''));
                } else {
                    return $filter('date')(
                        ctrl.dateStart,
                        'dd' + (ctrl.dateStart.getMonth() !== ctrl.dateEnd.getMonth() ? ' MMM' : '') 
                        + (ctrl.dateStart.getFullYear() !== TODAY.getFullYear() || ctrl.dateEnd.getFullYear() !== TODAY.getFullYear() ? ' yyyy' : '')
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

    function mdDateRangePickerLink(scope) {
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
                            $mdDialog.hide(vm.model);
                        }
                        vm.cancel = function () {
                            $mdDialog.hide(false);
                        }
                    }],
                    controllerAs: 'vm',
                    template: ['<md-dialog aria-label="Date Range Picker">',
                        '<md-dialog-content>',
                        '<md-date-range-picker date-start="vm.model.dateStart" date-end="vm.model.dateEnd" selected-template="vm.model.selectedTemplate" selected-template-name="vm.model.selectedTemplateName"></md-date-range-picker>',
                        '</md-dialog-content>',
                        '<md-dialog-actions layout="row" layout-align="end center">',
                        '<md-button ng-click="vm.cancel()">Cancel</md-button>',
                        '<md-button class="md-raised md-primary" ng-click="vm.ok()">Ok</md-button>',
                        '</md-dialog-actions>',
                        '</md-dialog>'].join(''),
                    parent: angular.element(document.body),
                    targetEvent: config.targetEvent,
                    clickOutsideToClose: true
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
