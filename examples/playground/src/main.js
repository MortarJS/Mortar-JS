'use strict';

/**
 * Packages
 * @type {exports}
 */
var React = require('react');
var reactDOM = require('react-dom');
var config = require('./config/config');
var Router  = require('react-router');
var AppContainer = require('./app-container').MortarJS;

/**
 * Pull in application routes
 *
 * @type {Routes|exports}
 */
var Routes = require('./routes');

// Attach react router
window.__app_container = document.getElementById('root');
Router.run(Routes, function (Handler) {
	reactDOM.render(
		(
			<div>
				<Handler/>
				<footer>Made by <a href="http://fuzzproductions.com">Fuzz Productions</a></footer>
			</div>
		), window.__app_container);
});

/**
 * Pull in index.html!
 *
 * @type {exports}
 */
require('./index.html');

/**
 * Pull in css/scss/js file assets
 *
 * @type {exports}
 */
require('./assets');

/**
 * Pull in image assets
 *
 * @type {exports}
 */
require('./public/favicon.ico');
