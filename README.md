# App Store Widget Boilerplate

This boilerplate gives you all you need to start a new custom widget for Mendix 5.6.0 and up.

The boilerplate contains:

- Directory structure.
- Readme.md file.
- License.
- Javascript source.
- XSD for package.xml, to configure properties of the widget, visible inside the Mendix business modeler.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Typical usage scenario

Use this template to start building a widget for Mendix 5.
Alter this README.md file and describe what your widget does.
 
## Description

The javascript inside the widget has examples of:

- Using CSS within a Widget.
- Using templating.
- Loading external library's.
- DOM manipulation.
- Event attaching.
- Loading data.
- Executing microflow and sending data.
- Working with the context object (The object that is send by a contextview , for instance a dataview).

### Dojo AMD module list

The javascript contains a really extensive list of modules that may be used to build the widget. It is best to reduce this list to what is actually used. Plugins like jsLint for Notepad++ will show unused objects. **Be sure to keep the module name array and the parameter list of the anonymous function below the module list in sync!**

The following modules are necessary for all widgets:

- dojo/_base/declare
- mxui/widget/_WidgetBase
- dijit/_Widget

If your widget does not use an HTML template:

- Remove dijit/_TemplatedMixin from the module list
- Remove _Templated from the parameter list of the anonymous function below the module list
- Remove _Templated from the parameter list of the declare call
- Remove the templates folder

If your widget does not need jQuery:

- Remove WidgetName/widget/lib/jquery from the module list
- Remove _jQuery from the parameter list of the anonymous function below the module list
- Remove _jQuery from the parameter list of the declare call
- Remove jquery.js from src\WidgetName\widget\lib\ Or remove the lib folder if you don't include external libraries in the widget.

## Migrating a widget to Dojo AMD

A widget that uses Dojo AMD may not refer to functions like *dojo.query* etc. All necessary modules must be declared on the module list at the top of the source.

Replacing all 'old' Dojo calls in an existing source can be a bit of a pain.

Here is a list of commonly used functions and their AMD counterpart:

Old | New
---------- |---------- 
mxui.dom              | domMx
dojo.byId             | dom.byId
dojo.query            | domQuery
dojo.forEach          | dojoArray.forEach
dojo.hitch            | lang.hitch
dojo.addClass         | domClass.add
dojo.removeClass      | domClass.remove
dojo.hasClass         | domClass.contains
dojo.replaceClass     | domClass.replace
dojo.empty            | domConstruct.empty
dojo.place            | domConstruct.place 
dojo.on               | on
dojo.window           | win
  
Do not use domQuery.query! Just domQuery

The referenced modules are in the module list of the boilerplate javascript
