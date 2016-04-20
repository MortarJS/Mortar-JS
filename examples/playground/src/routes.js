var React         = require('react');
var Router        = require('react-router');

var Link          = Router.Link;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;

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
	<Route path="/" handler={App}>
		<Route name="index"                                            handler={Dashboard} />

		<Route name="table"          path="/components/table"          handler={Table} />

		<Route name="tooltip"        path="/components/tooltip"        handler={Tooltip} />
		<Route name="modalcontainer" path="/components/modalcontainer" handler={ModalContainer} />
		<Route name="buttondrawer"   path="/components/buttondrawer"   handler={ButtonDrawer} />

		<Route name="dropdown"       path="/components/dropdown"       handler={DropdownSelect} />
		<Route name="input"          path="/components/input"          handler={Input} />
		<Route name="toggle"         path="/components/toggle"         handler={Toggle} />
		<Route name="typeaheadinput" path="/components/typeaheadinput" handler={TypeAheadInput} />
		<Route name="radio"          path="/components/radio"          handler={RadioButtons} />
		<Route name="checkbox"       path="/components/checkbox"       handler={Checkbox} />
		<Route name="fileinput"      path="/components/fileinput"      handler={FileInput} />
		<Route name="textarea"       path="/components/textarea"       handler={TextArea} />

		<NotFoundRoute handler={Dashboard} />
	</Route>
);

module.exports = Routes;
