# ClimbingGradeWidget

## Introduction

The ClimbingGrade widget is based on [lepoetemaudit/percentageloader](https://github.com/lepoetemaudit/percentageloader) and  [Grantismo/climbing-grade.js](https://github.com/Grantismo/climbing-grade.js)

![Widget](http://troulite.fr/~lolo/widget.png)

The plugin takes miniminal installation and is simple and flexibile to use. It makes use of HTML 5 canvas for a rich graphical appearance with only a 10kb (minified) javascript file necessary (suggested web font optional). It uses vectors rather than images so can be easily
deployed at various sizes by simply adjusting the initial parameters. For a live demo please see
[http://widgets.better2web.com/loader](http://widgets.better2web.com/loader)

## Requirements

* jQuery 1.4+ (if using the jQuery interface)
* Firefox 3.0+, Safari 4.0+, Chrome 7+, IE9+, Opera 9+

(i.e any browser with reasonable canvas support)

## Licence

This jQuery plugin is licensed under the Simplified BSD License. Please
see the file license.txt for full information on the licence.

## Installation

1. Include the javascript file (a minified version is also provided)
2. You can also include the (optional but recommended web font) - Bebas Neue + fontkit CSS. This can
   found downloaded at [http://www.fontsquirrel.com/fonts/bebas-neue](http://www.fontsquirrel.com/fonts/bebas-neue)
3. Run `$.percentageLoader` on any block element where you want the widget to appear if using jQuery, or simply
   `var loader = new PercentageLoader(domElement, options)`

Options include:

* `progress` (initial starting position of loader, range 0 - 1.0)
* `value` (initial label for the value)
* `width` (default 256)
* `height` (default 256)
* `controllable` (true/false, defaults to false) allows the user to set the value by clicking
* `onProgressUpdate(value)` - provide a callback function for controllable loaders with the updated value


## Examples:

    // jQuery
    $("#myDiv").percentageLoader({
        width : 180, height : 180, progress : 0.5, value : '512kb'});
        
    // Without jQuery
    var loader = new PercentageLoader(
        document.getElementById('myDiv'), 
        {width : 180, height : 180, progress : 0.5, value : '512kb'});

You can update the values by using the same call if using jQuery, e.g.

    $("#myDiv").percentageLoader({value: '250kb', progress: 0.5);

Otherwise, use the methods returned when you created the loader:

    loader.setValue('250kb');
    loader.setProgress(0.5);
    
You can handle updates with a user-controllable loader with a callback function:

    var loader;
    loader = $("myDiv").percentageLoader({
        controllable : true,
        onProgressUpdate : function (value) {
            this.setProgress(value * 100.0);
        }
    });

Note how `this` in the callback is scoped to the underlying plugin object, where you can
call `setProgress` and `setValue` directly.

