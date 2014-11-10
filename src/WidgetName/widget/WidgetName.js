/**
	Widget Name
	========================

	@file      : WigetName.js
	@version   : 1.0
	@author    : ...
	@date      : 22-08-2014
	@copyright : Mendix Technology BV
	@license   : Apache License, Version 2.0, January 2004

	Documentation
	=============
	Describe your widget here.

*/
dojo.provide('WidgetName.widget.WidgetName');

dojo.declare('WidgetName.widget.WidgetName', [ mxui.widget._WidgetBase, dijit._Templated, dijit._Container, dijit._Contained, mxui.mixin._Contextable ], {

	/**
	 * Internal variables.
	 * ======================
	 */
	_wgtNode				: null,
	_contextGuid			: null,
	_contextObj				: null,
    _handle                 : null,

	// Extra variables
	_message				: 'Hello world!',
	_extraContentDiv		: null,

    // Template path
    templatePath            : dojo.moduleUrl('WidgetName', 'widget/templates/WidgetName.html'),

	/**
	 * Mendix Widget methods.
	 * ======================
	 */

	// DOJO.WidgetBase -> PostCreate is fired after the properties of the widget are set.
	postCreate: function () {
		'use strict';

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
        'use strict';

        // Example setting message
        this.widgetNameNode.appendChild(mxui.dom.create('span', 'internal propertie as constant: ' + this._message));

        // postCreate
        console.log('WidgetName - startup');
    },

	/**
	 * What to do when data is loaded?
	 */

	update : function (obj, callback) {
		'use strict';

        // startup
        console.log('WidgetName - update');

        // Release handle on previous object, if any.
        if (this._handle) {
            mx.data.unsubscribe(this._handle);
        }

		if (typeof obj === 'string') {
			this._contextGuid = obj;
            mx.data.get({
				guids    : [this._contextGuid],
				callback : dojo.hitch(this, function (objs) {
					this._contextObj = objs;
				})
			});
		} else {
			this._contextObj = obj;
		}

		if (obj === null) {
			// Sorry no data no show!
			console.log('WidgetName  - update - We did not get any context object!');
		} else {
			// Load data
			this._loadData();
            // Subscribe to object updates.
            this._handle = mx.data.subscribe({
                guid: this._contextObj.getGuid(),
                callback: dojo.hitch(this, this._loadData)
            });
		}

		if (typeof callback !== 'undefined') {
			callback();
		}
	},

	/**
	 * How the widget re-acts from actions invoked by the Mendix App.
	 */
	suspend : function () {
		'use strict';
		//TODO, what will happen if the widget is suspended (not visible).
	},

	resume : function () {
		'use strict';
		//TODO, what will happen if the widget is resumed (set visible).
	},

	enable : function () {
		'use strict';
		//TODO, what will happen if the widget is suspended (not visible).
	},

	disable : function () {
		'use strict';
		//TODO, what will happen if the widget is resumed (set visible).
	},

	unintialize: function () {
		'use strict';
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
		'use strict';

		// To be able to just alter one variable in the future we set an internal variable with the domNode that this widget uses.
		this.widgetNameNode = this.domNode;

		// Load external library (EXAMPLE)
		if (typeof jQuery !== 'undefined') {
			dojo.require('WidgetName.widget.lib.jquery-1_11_1_min');

			// To avoid jQuery incompatible behavior we set jquery to the older version with noConflict(); after we have attached the currently loaded jQuery as a variable inside the widget.
			this.$ = jQuery;
			jQuery.noConflict(); // Restore older version
		}

	},

	 // Create child nodes.
	_createChildNodes : function () {
		'use strict';

		// Assigning externally loaded library to internal variable inside function.
		var $ = this.$;

        console.log('WidgetName - createChildNodes events');
	},

	// Attach events to newly created nodes.
    _setupEvents: function () {
        'use strict';

        console.log('WidgetName - setup events');

        dojo.on(this.widgetNameNode, 'click', dojo.hitch(this, function () {

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
                    console.log(error.description);
                }
            }, this);

        }));

	},


	/**
	 * Interaction widget methods.
	 * ======================
	 */
    _loadData : function () {
        'use strict';

        // TODO, get aditional data from mendix.

        // Set background color after context object is loaded.
        this.widgetNameNode.style.backgroundColor = this._contextObj.get(this.backgroundColor);
    },

	_showMessage: function () {
        'use strict';

		console.log(this.messageString);
	}

});