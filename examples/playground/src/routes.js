var React = require('react');

import {Route, IndexRoute} from 'react-router';

/**
 * Components
 *
 * @type {exports}
 */
var MortarJS = require('./bootstrap').MortarJS;
var App      = MortarJS.Components.Global.App;

/**
 * CMS Pages
 *
 * @type {exports}
 */
var Dashboard      = require('./pages/dashboard/Dashboard');

// Form Components
var DropdownSelect = require('./pages/components/form/DropdownSelect/DropdownSelect');
var Input          = require('./pages/components/form/Input/Input');
var Toggle         = require('./pages/components/form/Toggle/Toggle');
var TypeAheadInput = require('./pages/components/form/TypeAheadInput/TypeAheadInput');
var RadioButtons   = require('./pages/components/form/RadioButtons/RadioButtons');
var Checkbox       = require('./pages/components/form/Checkbox/Checkbox');
var FileInput      = require('./pages/components/form/FileInput/FileInput');
var TextArea       = require('./pages/components/form/TextArea/TextArea');

// Visualization Components
var Table          = require('./pages/components/visualization/Table/Table');

// Global Components
var Tooltip        = require('./pages/components/global/Tooltip/Tooltip');
var ButtonDrawer   = require('./pages/components/global/ButtonDrawer/ButtonDrawer');
var ModalContainer = require('./pages/components/global/ModalContainer/ModalContainer');

/**
 * Routing
 *
 * This configuration doesn't necessarily map to routes, but to how the layout is presented by the router
 *
 * @type {JSX}
 * @TODO: top-level pages with no content should default to the first view
 * @TODO: build all these pages
 */
var Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />

		<Route path="components/">
			<Route path="table"          component={Table} />
			<Route path="tooltip"        component={Tooltip} />
			<Route path="modalcontainer" component={ModalContainer} />
			<Route path="buttondrawer"   component={ButtonDrawer} />
			<Route path="dropdown"       component={DropdownSelect} />
			<Route path="input"          component={Input} />
			<Route path="toggle"         component={Toggle} />
			<Route path="typeaheadinput" component={TypeAheadInput} />
			<Route path="radio"          component={RadioButtons} />
			<Route path="checkbox"       component={Checkbox} />
			<Route path="fileinput"      component={FileInput} />
			<Route path="textarea"       component={TextArea} />
		</Route>


		<Route path="*" component={Dashboard} />
	</Route>
);

module.exports = Routes;
