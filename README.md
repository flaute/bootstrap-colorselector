bootstrap-colorselector
=======================

A colorselector for Twitter Bootstrap which lets you select a color from a predefined set of colors only.

In contrast to many other colorpickers found on Github this one is reduced to a predefined set of colors.
This is why it is called "colorselector" rather than "colorpicker".

## Methods

### $().colorselector('fadeToColor', value)
Sets a color specified.
```javascript
$('#element').colorselector('fadeToColor', '#FF0000');
$('#element').colorselector('fadeToColor', 'rgb(255,0,0)');
```

### $().colorselector(options)
Attaches a colorselector to a &lt;select&gt; element.
```javascript
$('#element').colorselector();
```

### $().colorselector('setColor', 'color')
Sets a color specified by its hex-value.
```javascript
$('#element').colorselector('setColor', '#FF0000');
```

### $().colorselector('setValue', value)
Sets a color specified by its value.
```javascript
$('#element').colorselector('setId', 4);
```

## Examples / Demo

http://bootstrap-colorselector.flaute.com/

## Authors

+ [@flaute](https://github.com/flaute/)

## Inspired by:

+ [@tkrotoff](https://github.com/tkrotoff/) / https://github.com/tkrotoff/jquery-simplecolorpicker
+ [@lauren](https://github.com/lauren/) / https://github.com/lauren/pick-a-color

Thanks for their inspiration and ideas.

## License

Copyright 2014 Flaute

Licensed under the MIT License
