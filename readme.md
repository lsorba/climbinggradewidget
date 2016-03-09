# ClimbingGrade widget

## Introduction

The ClimbingGrade widget is based on [lepoetemaudit/percentageloader](https://github.com/lepoetemaudit/percentageloader) and  [Grantismo/climbing-grade.js](https://github.com/Grantismo/climbing-grade.js)

![Widget](http://www.laurent-sorba.fr/climbinggradewidget/widgets.png)

The plugin takes miniminal installation and is simple and flexibile to use. It makes use of HTML 5 canvas for a rich graphical appearance with only a 20kb (minified) javascript file necessary (suggested web font optional). It uses vectors rather than images so can be easily deployed at various sizes by simply adjusting the initial parameters.

You can try it here:
* http://www.laurent-sorba.fr/climbinggradewidget/demo.html
* http://www.laurent-sorba.fr/climbinggradewidget/demo-nonjquery.html

## Requirements

* jQuery 1.4+ (if using the jQuery interface)
* Firefox 3.0+, Safari 4.0+, Chrome 7+, IE9+, Opera 9+

(i.e any browser with reasonable canvas support)

## Licences

### lepoetemaudit/percentageloader

This jQuery plugin is licensed under the Simplified BSD License. Please see the file license.txt for full information on the licence.

### Grantismo/climbing-grade.js

This javascript is licensed under the MIT License (MIT). Please see the file climbing-grade-LICENSE for full information on the licence.

## Installation

1. Include the javascript file (a minified version is also provided): dist/climbinggradewidget.min.js
2. You can also include the (optional but recommended web font) - Bebas Neue + fontkit CSS: dist/climbinggradewidget.css
Font from [http://www.fontsquirrel.com/fonts/bebas-neue](http://www.fontsquirrel.com/fonts/bebas-neue)
3. Run `$.percentageLoader` on any block element where you want the widget to appear if using jQuery, or simply
   `var loader = new PercentageLoader(domElement, options)`

Options include:

* `progress` (initial starting position of loader, range 0 - 1.0)
* `maingradevalue` (initial label for the value)
* `secondarygradevalue` (initial label for the value)
* `width` (default 128)
* `height` (default 128)
* `controllable` (true/false, defaults to false) allows the user to set the value by clicking
* `onProgressUpdate(value)` - provide a callback function for controllable loaders with the updated value

Supported grade formats are:

* grade.format('french'); // '6A+'
* grade.format('australian'); // '35'
* grade.format('south_african'); // '37'
* grade.format('uiaa'); // 'XI+'
* grade.format('hueco'); // 'V13'
* grade.format('font'); // '8B'
* grade.format('british'); // 'E10 7c'
* grade.format('yds'); // '5.14d'

## Examples:

    var mingrade = 0;
    var maxgrade = 96 ;
    var curgrade = 0;
    var grade = new ClimbingGrade(curgrade.toString() , "internal");
    
    // jQuery
    $("#myDiv").percentageLoader({
        width : 128, height : 128, 
        progress : (curgrade-mingrade) / (maxgrade-mingrade),
        maingradevalue :  grade.format("french"),
        secondarygradevalue : grade.format("uiaa")});
        
    // Without jQuery
    var loader = new PercentageLoader(
        document.getElementById('myDiv'), 
        { width : 128, height : 128, 
        progress : (curgrade-mingrade) / (maxgrade-mingrade),
        maingradevalue :  grade.format("french"),
        secondarygradevalue : grade.format("uiaa")});

You can update the values by using the same call if using jQuery, e.g.

    $("#myDiv").percentageLoader({
        progress : (curgrade-mingrade) / (maxgrade-mingrade),
        maingradevalue :  grade.format("french"),
        secondarygradevalue : grade.format("uiaa")});

Otherwise, use the methods returned when you created the loader:

    loader.setMainGradeValue(grade.format("french"));
    loader.setSecondaryGradeValue(grade.format("uiaa"));
    loader.setProgress((curgrade-mingrade) / (maxgrade-mingrade));
    
You can handle updates with a user-controllable loader with a callback function:

    var loader;
    loader = $("myDiv").percentageLoader({
            width: 128, height: 128, controllable: true, progress: 0.5, onProgressUpdate: function (val) {
	      var grade = new ClimbingGrade( (Math.round(mingrade+(val*(maxgrade-mingrade)))).toString() , "internal");
              this.setSecondaryGradeValue(grade.format("uiaa"));
              this.setMainGradeValue(grade.format("french"));
            }
          });

Note how `this` in the callback is scoped to the underlying plugin object, where you can
call `setProgress` and `setMainGradeValue` / `setSecondaryGradeValue` directly.

