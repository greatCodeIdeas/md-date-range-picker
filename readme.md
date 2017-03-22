# md-date-range-picker

A simple Angular Date range picker with material theme

## ussage/code example 

[![NPM](https://nodei.co/npm/md-date-range-picker.png)](https://npmjs.org/package/md-date-range-picker)

- install using npm packages
- `npm install md-date-range-picker`
- install using bower
- `bower install md-date-range-picker`

## Demo

- https://ipiz.herokuapp.com/md-date-range-picker-demo/index.html

example:
html
```html
<body ng-app="demo.app" ng-cloak>
  <div ng-controller="ctrl">
    <h1>{{'2016-09-26T14:47:56Z' | date: 'medium'}}</h1>
    <md-button class="md-raised md-primary" ng-click="pick($event, false)">Pick A Date Range</md-button>
    <md-button class="md-raised md-primary" ng-click="pick($event, true)">Pick A Date Range With Template</md-button>
    <md-button class="md-raised md-primary" ng-click="clear($event)">Clear Range</md-button>
    <md-date-range ng-model="selectedRange" placeholder="Select Date Range"></md-date-range>
    <h2>Selected Date Range: {{selectedRange.dateStart | date}} - {{selectedRange.dateEnd | date}}</h2>
    <h2>Selected Date Template:{{selectedRange.selectedTemplateName}} - {{selectedRange.selectedTemplate}}</h2>
    <md-date-range-picker
      md-on-select="onSelect()"
      date-start="selectedRange.dateStart"
      date-end="selectedRange.dateEnd"
      selected-template-name="selectedRange.selectedTemplateName"
      selected-template="selectedRange.selectedTemplate"
      show-template="false"
      first-day-of-week="0"
      localization-map="mdLocalizationMap"
      custom-templates="mdCustomTemplates"
      disable-templates="TW,LW"
    ></md-date-range-picker>
  </div>
</body>
```
js
```javascript
angular.module('demo.app', ['ngMaterial', 'ngMaterialDateRangePicker'])
    .controller('ctrl', function($scope, $mdDateRangePicker) {
        var tmpToday = new Date();
       $scope.mdCustomTemplates = [
            {   name:"Last 3 Months",
                dateStart: new Date((new Date()).setMonth(tmpToday.getMonth() - 3)),
                dateEnd : new Date()
            },
            {
                name:"Last 6 Months",
                dateStart: new Date((new Date()).setMonth(tmpToday.getMonth() - 6)),
                dateEnd : new Date()
            }
        ];
        $scope.mdLocalizationMap =  {
            'Mon':'Mon*',
            'This Week':'Current Week',
        };
        $scope.selectedRange = {
            selectedTemplate: 'TW',
            selectedTemplateName: 'This Week',
            dateStart: null,
            dateEnd: null,
            showTemplate: false,
            fullscreen: false
        };
        $scope.onSelect = function(scope) {
            console.log($scope.selectedRange.selectedTemplateName);
            return $scope.selectedRange.selectedTemplateName;
        };
        $scope.pick = function($event, showTemplate) {
            console.log('Button Fired!');
            $scope.selectedRange.showTemplate = showTemplate;
            $mdDateRangePicker.show({
                targetEvent: $event,
                model: $scope.selectedRange
            }).then(function(result) {
                if (result) $scope.selectedRange = result;
            })
        };
        $scope.clear = function() {
            $scope.selectedRange.selectedTemplate = null;
            $scope.selectedRange.selectedTemplateName = null;
            $scope.selectedRange.dateStart = null;
            $scope.selectedRange.dateEnd = null;
        }
    });
```

## dev tools

- Clone Repo
- `npm install`
- `npm start` for dev serve
- `npm run build` for build
- `npm run dist` for dist serve

## TODO:
- Optimize code
- Create unit tests
- Standardize build script
