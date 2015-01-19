/*jslint white:true, nomen: true, plusplus: true */
/*global mx, mendix, require, console, define, module, logger, mxui */
/*mendix */
/**

	WidgetName
	========================

	@file      : WidgetName.js
	@version   : 1.0
	@author    : {{author}}
	@date      : 22-08-2014
	@copyright : Mendix Technology BV
	@license   : Apache License, Version 2.0, January 2004

	Documentation
    ========================
	Describe your widget here.

*/

(function () {
    'use strict';

    // Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
    require([

        'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_Widget', 'dijit/_TemplatedMixin',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/window', 'dojo/on', 'dojo/_base/lang', 'dojo/text',
        'WidgetName/widget/lib/jquery'

    ], function (declare, _WidgetBase, _Widget, _Templated, domMx, dom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, win, on, lang, text, _jQuery) {

        // Declare widget.
        return declare('WidgetName.widget.WidgetName', [ _WidgetBase, _Widget, _Templated, _jQuery ], {

            /**
             * Internal variables.
             * ======================
             */
            _data: {},

            // Template path
            templatePath: require.toUrl('WidgetName/widget/templates/WidgetName.html'),

            /**
             * Mendix Widget methods.
             * ======================
             */

            // DOJO.WidgetBase -> PostCreate is fired after the properties of the widget are set.
            postCreate: function () {

                // postCreate
                console.log('WidgetName - postCreate');

                // Load CSS ... automaticly from ui directory

                // Setup widgets
                this._setupWidget();

                // Create childnodes
                this._createChildNodes();

                // Setup events
                this._setupEvents();

                // Show message
                this._showMessage();

            },

            // DOJO.WidgetBase -> Startup is fired after the properties of the widget are set.
            startup: function () {

                // postCreate
                console.log('WidgetName - startup');

                // Example setting message
                this.domNode.appendChild(mxui.dom.create('span', 'internal propertie as constant: ' + this.messageString));

            },

            /**
             * What to do when data is loaded?
             */

            update: function (obj, callback) {

                // Context object should be set before loaddata.
                this._data[this.id]._contextObj = obj;
                
                // startup
                console.log('WidgetName - update');

                // Release handle on previous object, if any.
                if (this._data[this.id]._handle) {
                    mx.data.unsubscribe(this._data[this.id]._handle);
                }

                if (typeof obj === 'string') {
                    this._data[this.id]._contextGuid = obj;
                    mx.data.get({
                        guids: [this._data[this.id]._contextGuid],
                        callback: lang.hitch(this, function (objs) {

                            // Set the object as background.
                            this._data[this.id]._contextObj = objs[0];

                            // Load data again.
                            this._loadData();

                        })
                    });
                } else {
                    this._data[this.id]._contextObj = obj;
                }

                if (obj === null) {

                    // Sorry no data no show!
                    console.log('WidgetName  - update - We did not get any context object!');

                } else {
                    
                    // Load data
                    this._loadData();

                    // Subscribe to object updates.
                    this._data[this.id]._handle = mx.data.subscribe({
                        guid: this._data[this.id]._contextObj.getGuid(),
                        callback: lang.hitch(this, function (obj) {

                            mx.data.get({
                                guids: [obj],
                                callback: lang.hitch(this, function (objs) {

                                    // Set the object as background.
                                    this._data[this.id]._contextObj = objs[0];

                                    // Load data again.
                                    this._loadData();

                                })
                            });

                        })
                    });
                }

                // Execute callback.
                if (typeof callback !== 'undefined') {
                    callback();
                }
            },

            /**
             * How the widget re-acts from actions invoked by the Mendix App.
             */
            suspend: function () {
                //TODO, what will happen if the widget is suspended (not visible).
            },

            resume: function () {
                //TODO, what will happen if the widget is resumed (set visible).
            },

            enable: function () {
                //TODO, what will happen if the widget is suspended (not visible).
            },

            disable: function () {
                //TODO, what will happen if the widget is resumed (set visible).
            },

            uninitialize: function () {
                //TODO, clean up only events
                if (this._data[this.id]._handle) {
                    mx.data.unsubscribe(this._data[this.id]._handle);
                }
            },


            /**
             * Extra setup widget methods.
             * ======================
             */
            _setupWidget: function () {

                // Setup jQuery
                this.$ = _jQuery().jQuery();
                
                // To be able to use this widget with multiple instances of itself we need to add a data variable.
                this._data[this.id] = {
                    _contextGuid: null,
                    _contextObj: null,
                    _handle: null
                };

            },

            // Create child nodes.
            _createChildNodes: function () {

                // Assigning externally loaded library to internal variable inside function.
                var $ = this.$;

                console.log('WidgetName - createChildNodes events');

            },

            // Attach events to newly created nodes.
            _setupEvents: function () {

                console.log('WidgetName - setup events');

                on(this.domNode, 'click', lang.hitch(this, function () {

                    mx.data.action({
                        params: {
                            applyto: 'selection',
                            actionname: this.mfToExecute,
                            guids: [this._data[this.id]._contextObj.getGuid()]
                        },
                        callback: lang.hitch(this, function (obj) {
                            //TODO what to do when all is ok!
                        }),
                        error: function (error) {
                            console.log(error.description);
                        }
                    }, this);

                }));

            },


            /**
             * Interaction widget methods.
             * ======================
             */
            _loadData: function () {

                // Set background color after context object is loaded.
                this.domNode.style.backgroundColor = this._data[this.id]._contextObj.get(this.backgroundColor);
            },

            _showMessage: function () {
                console.log(this.messageString);
            }
        });
    });

}());


