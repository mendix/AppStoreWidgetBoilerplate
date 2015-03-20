/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */
/*
    WidgetName
    ========================

    @file      : WidgetName.js
    @version   : {{version}}
    @author    : {{author}}
    @date      : {{date}}
    @copyright : {{copyright}}
    @license   : {{license}}

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
require({
    packages: [{ name: 'jquery', location: '../../widgets/WidgetName/lib', main: 'jquery-1.11.2.min' }]
}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
    'jquery', 'dojo/text!WidgetName/widget/template/WidgetName.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, $, widgetTemplate) {
    'use strict';
    
    // Declare widget's prototype.
    return declare('WidgetName.widget.WidgetName', [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        mfToExecute: "",
        messageString: "",
        backgroundColor: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,
        
        // Mobile event emulator
        _clickEvent: null,
        _mouseDownEvent: null,
        _mouseUpEvent: null,
        _mouseOutEvent: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._objProperty = {};
            
            // Mobile event emulator
            if (document.ontouchstart !== null) {
                this._clickEvent = 'touchstart';
                this._mouseDownEvent = 'touchstart';
                this._mouseUpEvent = 'touchend';
                this._mouseOutEvent = 'touchend';
            } else {
                this._clickEvent = 'click';
                this._mouseDownEvent = 'mousedown';
                this._mouseUpEvent = 'mouseup';
                this._mouseOutEvent = 'mouseout';
            }
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            
            this.domNode.appendChild(dom.create('span', { 'class': 'widgetname-message' }, this.messageString));

            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
        
        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function(e) {
            if (document.ontouchstart !== null) {
                if(e.stopPropagation){
                    e.stopPropagation();
                } else {
                    if (e.preventDefault){
                        e.preventDefault();
                        e.cancelBubble = true;
                    } else {
                        e.cancelBubble = true;
                    }
                }
            }
        },
        
        _setupEvents: function () {
            this.connect(this.domNode, this._clickEvent, function (e) {
                
                // Stop the event from bubbling in mobile devices.
                this._stopBubblingEventOnMobile(e);
                
                mx.data.action({
                    params: {
                        applyto: 'selection',
                        actionname: this.mfToExecute,
                        guids: [this._contextObj.getGuid()]
                    },
                    callback: function (obj) {
                        //TODO what to do when all is ok!
                    },
                    error: function (error) {
                        console.log(this.id + ': An error occurred while executing microflow: ' + error.description);
                    }
                }, this);
                
            });
        },

        _updateRendering: function () {
            this.domNode.style.backgroundColor = this._contextObj ? this._contextObj.get(this.backgroundColor) : "";
        },

        _resetSubscriptions: function () {
            // Release handle on previous object, if any.
            if (this._handle) {
                this.unsubscribe(this._handle);
                this._handle = null;
            }

            if (this._contextObj) {
                this._handle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: this._updateRendering
                });
            }
        }
    });
});
