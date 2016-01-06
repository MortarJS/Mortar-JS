# Fuzzy Reaction - it's components all the way down
This library tries to follow the Flux architecture and provides a base configuration for an admin panel. The library is divided into 5 sections:

## Contributing
We follow a `feature-branch -> dev -> release` contribution model.  To contribute please:

* Create a new branch off of Dev.
  * If the branch is for an open issue, reference the issue in your branch name (i.e. `issue-12`)
* Work on your working branch.  Commits should mention the issue number (i.e. `Adding documentation for issue #3`);
* Push your branch
* Open a merge-request to dev.

## Documentation
Documentation exists in ./documentation/index.html

At this time, it is a heavily immature WIP.  Documentation is auto-generated using `jsdoc`.

To contribute to documentation:
1. `npm install -g jsdoc`
1. Add JsDoc comments to components
1. From the root directory, `npm run document` to update the documentation

## Actions + Action Constants - dictate how an application can be used
Actions, located in `lib/actions` contain a base set of actions for authentication and error handling. These actions implement `lib/constants/AppActionConstants.js` which is essentially an object that dictates actions through which a user can interact with the application.

## Actions utilize API utils - helper modules for retrieving/sending/managing data
Utils are located in `lib/utils` and are responsible for providing an interface for Actions to request data from a REST API. An `ApiService` util is provided and currently supports GET, POST, DELETE (it will support ALL HTTP verbs eventually) and will automatically handling routing of error messages through the ErrorHandling flow (ErrorAction->Dispatcher->ErrorStore->AlertComponent)

## Actions fire the application dispatcher
Located in `lib/dispatcher`, the central App Dispatcher is a singleton which funnels all action events through to their respective stores.

## Stores register with the dispatcher to listen and respond to specific events
Stores in `lib/stores` listen for events and store data as required. They're responsible for containing all application data and providing getters for views to retrieve that data. This library provides a set of base stores

## Components listen to all store events and react accordingly
Components register listeners with (an) appropriate store(s) and listen to *all* change events. Data is not passed directly to the components on each change event, they must utilize a store's getter functions to retrieve data. Components will render a view for the user to interact with and upon interaction, fire off an action which will restart the unidirectional data flow cycle.

A component is composed of an HTML template and some Javascript display logic. Components can be nested and can pass down data in the form of properties to their children.

## An example of the Flux architecture
Let's examine the authentication flow in detail to see how Flux handles data flow in a React application.

1. A user loads the login page, which mounts the `lib/components/authentication/login/Login.js` component.
1. Upon mounting, the Login component registers a change listener with the `CmsUserStore` with an `_onChange` handler to determine the user's login status.
1. Clicking the 'Login' button fires off a `handleSubmit` function within the component which in turn fires the `login` action of the `AuthenticationServerActionCreators`. This action queries the API via `lib/utils/AuthenticationApi.js`, registering a callback method to accept a response.
1. Once a response is received in `AuthenticationServerActionCreators.saveTokenToLocalStorage` an event is dispatched which the `lib/stores/CmsUserStore.js` will listen to. The LOGGED_IN event will trigger the store to save the user's logged in status and `CmsUserStore.emitChange` will notify any component listeners of an updated store state.
1. The component's change listener will determine whether the user is logged in and should be redirected into the application or is still not logged in and should be shown the login page with an error.

## Fuzzy Components
A useful way to determine how to interface with a component would be to view its `propTypes` validation property. For example, the Form component:
```javascript
propTypes: {
    // The bound resource
    bindResource: React.PropTypes.object.isRequired,
    // Submit handler in the parent component
    onSubmit: React.PropTypes.func
}
```
We can see here that the Form component requires  `bindResource` and leaves the `onSubmit` handler optional. React will issue warnings to the developer if these properties aren't validated.

### 1. Authentication
Implements functionality in: `actions`, `constants`, `dispatcher`, `stores`, `utils`.
An auth system that follows the auth flow for our Fuzz/ApiServer package. includes:
1. Login logic and a login page
1. Logout logic and a redirect to login page
1. A wrapper component that will require authentication to access the App component (thus the whole application)
1. A wrapper component to restrict components based on user permissions. This will change as `Fuzz/ApiServer` implements real ACL.

### 2. Resource Management
Managing resources with the API can (optionally) be handled through the CMS framework's resource utilities.

#### Requesting/Sending Data
If a component requires data (ex: a table) we can use the available ResourceActions to request resources and listen to a  standardized set of events in our stores.

For example, if I want to request a list of instructors in my InstructorPage component, I can call this function in componentDidMount():
```javascript
var ResourceActions = FuzzyReaction.Actions.ResourceActions;
/**
 * Fire an action to request data from the API
 */
requestTableData: function (modifiers) {
	modifiers = modifiers || {};
	modifiers['filters'] = 'filters[is_subscriber]=false&include[]=instructor&include[]=instructor.genres';
	this.options.modifiers = modifiers;
	var instructors = new ResourceActions('users');
	instructors.getResource(this.options);
}
```
ResourceActions exposes methods to:
* GET a resource (`getResource`)
* POST a resource (`createResource`)
* PUT a resource (`updateResource`)
* DELETE a resource (`deactivateResource`)

... and will handle using the APIService to request data. Once data is received, ResourceActions will dispatch an event in the form of `USERS_RECEIVED_ALL` or `USERS_RECEIVED_ONE` which your stores can listen to.

ResourceActions which request data accept only an `options` parameter while actions which send data accept `data` and `options`. These parameters are just passed through to APIService.

If ResourceActions does not provide enough configurability for an endpoint, a custom action->APIService->callback->dispatcher->store flow can be created.

### 3. Global/General use components

#### Alert Handling
Listens to `lib/AlertStore.js` and determines an alert to display based on `AlertStore.getAlert`'s return. To use the AlertHandler, simply dispatch an ALERT_ERROR or ALERT_SUCCESS event with `actionOrError` and `message` properties.

#### Header and NavBar
These components manage what is displayed in the header bar of the page. A configuration object is passed in and navbar, app title, and dropdown links are determined through it. This component is already implemented in the app layout and only requires a configuration object to be passed in when FuzzyReaction is bootstrapped in your application.

#### App
The application wrapper component. Responsible for rendering the app as required along with its global components (Router and AlertHandler).

#### Modal
A modal component that can be triggered via a modal button (this will most likely be removed at a later point) or have its display state determined in a parent component and passed through as a boolean in the `openWhen` prop of the modal.

To include a modal:

```javascript
<Modal openWhen={this.state.openEditModal} options={{width: '80%'}} buttonText="Open Modal" target="testModal" title="Edit User" closeText="Close" saveText="Save Changes" afterClose={this.closeModal} beforeSave={this.updateUser}>
    <EditUserForm resource={this.state.workingResource} />
</Modal>
```
The modal component wraps custom HTML/JSX which will populate the modal body. In this example, modal display state is handled in the parent component (a user list page) via `openWhen`, we also register some event handlers in the form of the `afterClose` and `beforeSave` properties and wrap some HTML (in the EditUserForm component) for the modal. A full list of acceptable props for the modal can be seen in its `propTypes` property.

### 4. Page Structure
Column and row components - wrappers for bootstrap's `col-XX-XX` and `row` div classes.

### 5. Resource Editor

#### Creating a form
A form component which can bind to a resource (a JSON object) and accept an arbitrary set of child components (form inputs or otherwise). It will allow the form to edit specified paths in the resource and will keep the sourced copy of the resource (located in the FormStore) updated. Consider a user object:

```javascript
{
	"id": 4,
	"created_at": "2015-06-01 15:55:14",
	"updated_at": "2015-06-01 15:55:14",
	"expires_at": null,
	"deleted_at": null,
	"username": "syousoufov+2@fuzzproductions.com",
	"activity_level_id": null,
	"name": "simon",
	"birth_date": null,
	"gender": 1,
	"height": null,
	"pounds": 61,
	"do_notify_email": 0,
	"activity_level": null,
	"instructor": {
		"id": 1,
		"created_at": "2015-06-03 11:45:44",
		"updated_at": "2015-06-03 11:45:44",
		"deleted_at": null,
		"gender": 0,
		"name": "Instructor",
		"url": "http:\/\/www.fuzzproductions.com",
		"user_id": 4
	}
}
```

An example form and how to edit its nested `instructor.url` relationship:

```javascript
<Form key={"editUser" + this.props.resource.id} formKey="editUser"
    bindResource={this.props.resource} >
    <Column grid="sm" size="6">
        <Form.Input fieldKey="name" type="text" label="Name" placeholder="Name" limit={120} validations="isLength:4:120,isAlpha" />
    </Column>
    <Column grid="sm" size="6">
        <Form.TextArea fieldKey="pounds" label="Text Area Sample" placeholder="Text Area Sample.." limit={1000} validations="isLength:1:1000" />
        <Form.Input fieldKey="instructor.url" type="url" label="Instructor URL" placeholder="Instructor URL" validations="isURL" limit={100} />
    </Column>
</Form>
```

**NOTE:** Forms reset their data when they are mounted/dismounted. Here, each instance of the form is given a unique key by the user ID so that if we're navigating a table hitting 'Edit' on multiple users, React knows to fire the component's mount lifecycle methods so we're presented with a fresh form for each user.

The form field components accept a `validations` prop that follows https://www.npmjs.com/package/validator validation rules.

#### Retrieving Form Data
Once a form is editing, changes will propagate to the global FormStore from which form data can be retrieved with the formKey:

```javascript
bindResource: function () {
		this.setState({
			workingResource: FormStore.getResource(this.formKey),
			formIsValid: FormStore.isFormValid(this.formKey)
		});
	},
```
The FormStore exposes a lot of information about the form:

```javascript
getField: function (formKey, fieldKey) {}
hasForm: function (formKey) {}
getResource: function (formKey) {}
isFormValid: function (formKey) {}
isFieldValid: function (formKey, fieldKey) {}
```

### 6. Data Visualization

#### Tables
The table component accepts the following props:

```javascript
propTypes: {
	title: React.PropTypes.string.isRequired,
	data: React.PropTypes.array.isRequired,
	// Object of table column names and resource property keys
	dataKeys: React.PropTypes.object.isRequired,
	options: React.PropTypes.shape({
		editableRows: React.PropTypes.bool,
		// Whether to include Edit/Deactivate buttons
		actionableRows: React.PropTypes.bool,
		// Is the table drag sortable
		draggable: React.PropTypes.bool,
		// Callback to handle Edit/Deactivate @todo they should be standardized and automated
		actionsCallback: React.PropTypes.func,
		// Array of button actions
		actions: React.PropTypes.array,
		// Data presentation mutators
		mutators: React.PropTypes.object
	}),
	// The action creator through which to call actions such as table sort, deletion, etc
	actionCreator: React.PropTypes.object.isRequired
}
```
To set table options:

```javascript
var options = {
		actionableRows:    true,
		actions: ['edit:primary', 'deactivate:danger'],
		actionsCallback: this.handleAction,
		mutators: {
			gender: function (value, object) {
				return value === 0 ? 'Male' : 'Female';
			}
		}
	};
```
* `actionableRows` allows us to set `actions` buttons on each row (with a bootstrap button type class). The first argument will be the action string pass to your actionsCallback.
* `actionsCallback` allows the table to interact with your top-level component and is passed the `action` and the `resource`. For example, the above `actions` send back the following action strings to `InstructorsPage.handleActions`:

```javascript
handleAction: function (action, resource) {
	switch (action) {
		case 'deactivate':
			this.setState({
				openDeactivateModal: true,
				workingResource:     resource,
				resourceOperation:   action
			});
			break;
		case 'edit':
			this.setState({
				openEditModal:     true,
				workingResource:   resource,
				resourceOperation: action
			});
			break;
	}
}
```

Additional action strings:
* `create` - passed from the AddAction component (Material UI + button on the bottom right corner)
* `saveRow` - when Save is pressed on an editable table row
* `cancelEditRow` - when Cancel is pressed on an editable table row

#### Pagination
Pagination is automatically handled in the APIService and PaginationStore. Paginator components require a prop `actionMethod` which is the action (or a method that fires the action) to request your resource data. Ex:

```javascript
<Column grid="lg" size="12">
	<Table data={this.state.currentPageData}
		dataKeys={this.tableKeys}
		title={'Instructors'} options={options}
		actionCreator={UsersPageActions} />

	<Paginator actionMethod={this.requestTableData} />

	<PerPageSelector actionMethod={this.requestTableData} />

</Column>
```

```javascript
/**
 * Fire an action to request data from the API
 */
requestTableData: function (modifiers) {
	modifiers = modifiers || {};
	modifiers['filters'] = 'filters[is_subscriber]=false&include[]=instructor&include[]=instructor.genres';
	this.options.modifiers = modifiers;
	var instructors = new ResourceActions('users');
	instructors.getResource(this.options);
},
```

```javascript
/**
* Handle changes in data and request paginated data
 *
 * @private
 */
_onChange: function () {
	this.setState({
		currentPageData: InstructorsStore.getResourceListData()
	});
},
```

The flow:
1. Paginator fires the actionMethod and passes modifiers (pagination query strings like page and per_page) to it.
2. The action method re-requests the data with the appropriate pagination query parameters.
3. Your already registered change handler will update state and pass it down to the table component.

##### Filtering

Filtering works like pagination:

```javascript
<Filter filters={this.filterOptions} actionMethod={this.requestTableData} />
```

... and will pass modifiers to the `actionMethod`.

### 6. Structuring an application
Refer to web-project/cyclecast-admin for a sample application

#### Setting up the configuration
`config/config.js` sets up API settings and nav/header buttons.

#### Application entry point
Your `main.js` should include:

```javascript
'use strict';

/**
 * Packages
 * @type {exports}
 */
var React = require('react/addons');
var config = require('./config/config');
var FuzzyReaction = require('./bootstrap').FuzzyReaction;

/**
 * Pull in application routes
 *
 * @type {Routes|exports}
 */
var Routes = require('./routes');

// Starts the application and RouteHandler
FuzzyReaction.startApp(Routes);

/**
 * Pull in css/scss/js file assets
 *
 * @type {exports}
 */
require('./assets');
```

#### Defining routes
The CMS framework uses https://github.com/rackt/react-router to handle routing. Your routes should be passed in to `FuzzyReaction.startApp()`

#### Examples


## @TODO
1. Support all HTTP verbs in `ApiService.js`
1. Consolidate components such as table+pagination and make them easily configurable for quick setup
1. Provide example uses for each component
1. Document propType requirements in code to make them easier to use
1. Consolidate modal props into options object. Rework proptype validations.
1. Outline specific form field component interfaces.
