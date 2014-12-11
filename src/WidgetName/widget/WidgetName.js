/*jslint white: true nomen: true plusplus: true */
/*global mx, mxui, mendix, dojo, require, console, define, module, logger */
/**

	WidgetName
	========================

	@file      : WidgetName.js
	@version   : 1.0
	@author    : ...
	@date      : 22-08-2014
	@copyright : Mendix Technology BV
	@license   : Apache License, Version 2.0, January 2004

	Documentation
    ========================
	Describe your widget here.

*/

(function() {
    'use strict';

    // test
    require([

        'mxui/widget/_WidgetBase', 'dijit/_Widget', 'dijit/_TemplatedMixin',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/on', 'dojo/_base/lang', 'dojo/_base/declare', 'dojo/text',
        'WidgetName/widget/lib/jquery'

    ], function (_WidgetBase, _Widget, _Templated, domMx, dom, domQuery, domProp, domGeom, domClass, domStyle, on, lang, declare, text, _jQuery) {

        // Provide widget.
        dojo.provide('WidgetName.widget.WidgetName');

        // Declare widget.
        return declare('WidgetName.widget.WidgetName', [ _WidgetBase, _Widget, _Templated, _jQuery ], {

            /**
             * Internal variables.
             * ======================
             */
            _wgtNode: null,
            _contextGuid: null,
            _contextObj: null,
            _handle: null,

            // Extra variables
            _extraContentDiv: null,

            // Template path
            templatePath: dojo.moduleUrl('WidgetName', 'widget/templates/WidgetName.html'),

            /**
             * Mendix Widget methods.
             * ======================
             */

            // DOJO.WidgetBase -> PostCreate is fired after the properties of the widget are set.
            postCreate: function () {

                // postCreate
                logger.log('WidgetName - postCreate');

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
                logger.log('WidgetName - startup');

                // Example setting message
                this.domNode.appendChild(mxui.dom.create('span', 'internal propertie as constant: ' + this.messageString));

            },

            /**
             * What to do when data is loaded?
             */

            update: function (obj, callback) {

                // startup
                logger.log('WidgetName - update');

                // Release handle on previous object, if any.
                if (this._handle) {
                    mx.data.unsubscribe(this._handle);
                }

                if (typeof obj === 'string') {
                    this._contextGuid = obj;
                    mx.data.get({
                        guids: [this._contextGuid],
                        callback: dojo.hitch(this, function (objs) {

                            // Set the object as background.
                            this._contextObj = objs;

                            // Load data again.
                            this._loadData();

                        })
                    });
                } else {
                    this._contextObj = obj;
                }

                if (obj === null) {

                    // Sorry no data no show!
                    logger.log('WidgetName  - update - We did not get any context object!');

                } else {

                    // Load data
                    this._loadData();

                    // Subscribe to object updates.
                    this._handle = mx.data.subscribe({
                        guid: this._contextObj.getGuid(),
                        callback: dojo.hitch(this, function(obj){

                            mx.data.get({
                                guids: [obj],
                                callback: dojo.hitch(this, function (objs) {

                                    // Set the object as background.
                                    this._contextObj = objs;

                                    // Load data again.
                                    this._loadData();

                                })
                            });

                        })
                    });
                }

                // Execute callback.
                if(typeof callback !== 'undefined'){
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
                if (this._handle) {
                    mx.data.unsubscribe(this._handle);
                }
            },


            /**
             * Extra setup widget methods.
             * ======================
             */
            _setupWidget: function () {

                // Setup jQuery
                this.$ = _jQuery().jQuery();

                // To be able to just alter one variable in the future we set an internal variable with the domNode that this widget uses.
                this._wgtNode = this.domNode;

            },

            // Create child nodes.
            _createChildNodes: function () {

                // Assigning externally loaded library to internal variable inside function.
                var $ = this.$;

                logger.log('WidgetName - createChildNodes events');

            },

            // Attach events to newly created nodes.
            _setupEvents: function () {

                logger.log('WidgetName - setup events');

                dojo.on(this.domNode, 'click', dojo.hitch(this, function () {

                    mx.data.action({
                        params: {
                            applyto: 'selection',
                            actionname: this.mfToExecute,
                            guids: [this._contextObj.getGuid()]
                        },
                        callback: dojo.hitch(this, function (obj) {
                            //TODO what to do when all is ok!
                        }),
                        error: function (error) {
                            logger.log(error.description);
                        }
                    }, this);

                }));

            },


            /**
             * Interaction widget methods.
             * ======================
             */
            _loadData: function () {

                // TODO, get aditional data from mendix.

                // Set background color after context object is loaded.
                this.domNode.style.backgroundColor = this._contextObj.get(this.backgroundColor);
            },

            _showMessage: function () {
                logger.log(this.messageString);
            }
        });
    });

}());


