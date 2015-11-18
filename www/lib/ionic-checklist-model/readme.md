## ionic ready checklist-model
AngularJS directive for list of checkboxes. This is a forked project with some small changes to support <ion-checkbox> directive.
I recommend you to look to [Ion-Checkbox](http://ionicframework.com/docs/api/directive/ionCheckbox/) directive which is pretty simple and useful. I used this one here because I want to keep track of checked items without change my Lazy load arrays of objects.

### Why this is needed?  
In Angular one checkbox `<input type="checkbox" ng-model="...">` is linked 
with one model.  
But in practice we usually want one model to store array of checked values 
from several checkboxes.  
**Checklist-model** solves that task without additional code in controller.   
You should play with attributes of `<input>` tag:
  
1. set `checklist-model` instead of `ng-model`
2. set `checklist-value` - what should be picked as array item  

Please, try out live demo: http://vitalets.github.io/checklist-model

Jsfiddle: http://jsfiddle.net/Ebv3p/2/  
Plunker (more advanced): http://plnkr.co/edit/pZLF0KesMDnIap0eCfSG?p=preview

### Installation
1. [Download latest release](https://github.com/vitalets/checklist-model/releases) or use bower:
````
bower install checklist-model 
````

2. Add to app dependencies:
````js
var app = angular.module("app", ["checklist-model"]);
````

### License
MIT 
