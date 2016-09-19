# md-date-range-picker

A simple Angular Date range picker with material theme

## ussage/code example 

- install using npm packages
- `npm install md-date-range-picker`
- install using bower
- `bower install md-date-range-picker`

example:
html
```html
  <div ng-controller="ctrl">
    <md-button 
        class="md-raised md-primary" 
        ng-click="pick($event, false)">
        Pick A Date Range
    </md-button>
    <md-button 
        class="md-raised md-primary"
        ng-click="pick($event, true)">
        Pick A Date Range With Template
    </md-button>
    <h2>Selected Date Range: 
        {{selectedRange.dateStart | date}}
         - 
        {{selectedRange.dateEnd | date}}
    </h2>
    <h2>Selected Date Template:
        {{selectedRange.selectedTemplateName}}
         - 
        {{selectedRange.selectedTemplate}}
    </h2>
  </div>
```
js
```javascript
angular
    .module('demo.app', ['ngMaterial', 'ngMaterialDateRangePicker'])
    .controller('ctrl',function($scope, $mdDateRangePicker){
        $scope.selectedRange = {selectedTemplate:'TW', 
                                selectedTemplateName: 'This Week',
                                dateStart: null, 
                                dateEnd: null, 
                                showTemplate: false, 
                                fullscreen: false};
        $scope.pick = function($event, showTemplate){
            console.log('Button Fired!');
            $scope.selectedRange.showTemplate = showTemplate;
            $mdDateRangePicker
                .show({targetEvent:$event, model:$scope.selectedRange} )
                .then(function(result){
                    if(result) $scope.selectedRange = result;
                });
        };
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