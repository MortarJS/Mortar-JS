/**
 * Resource Component Mixin
 *
 * This mixin is used to help lighten the load of creating new Resource Components.
 * This mixin will handle adding and removing change listeneres, handling changes,
 * binding resources to scope, retrieving from stores, and firing optional callbacks as well.
 *
 * @example
 * var ResourceComponentMixin = Mortar.Mixins.ResourceComponentMixin;
 * React.createClass({
 *	mixins: [ResourceComponentMixin],
 *	pageConfig: function() {
 *		stores: [
 *			store: UsersStore,
 *			action: UsersStore.getUsers, // makes this request when a change happens on UsersStore
 *			bindTo: 'users', // will do this.setState({users: UsersStore.getUsers})
 *			callback: this.myCallback // fired after state is set
 *		]
 *	},
 *	componentDidMount: function() {
 *		_componentDidMount();
 *	},
 *	componentWillUnmount: function() {
 *		_componentWillUnmount();
 *	}
 *
 * @mixin
 */
var ResourceComponentMixin = {
	/**
	 * _componentDidMount
	 * Private function to not interfere with the componentDidMount of the user
	 * Attaches change listeners to the stores in pageConfig
	 *
	 * @return {null}
	 * @private
	 */
	_componentDidMount: function() {
		var self = this;

		self.pageConfig().stores.forEach(function(store) {
			store.store.addChangeListener(store.changeListener || self._onChange);
		});
	},

	/**
	 * _componentWillUnmount
	 * Private function to not interfere with the componentWillUnmount of the user
	 * Removes change listeners to the stores in pageConfig
	 *
	 * @return {null}
	 * @private
	 */
	_componentWillUnmount: function() {
		var self = this;

		self.pageConfig().stores.forEach(function(store) {
			store.store.removeChangeListener(store.changeListener || self._onChange);
		});
	},

	/**
	 * _onChange
	 * If the user doesn't pass a changeListener to the pageConfig, this one will be used be default
	 * Reacts to changes in the store and re-requests the data, binding the updates to the component's state.
	 *
	 * @private
	 * @return {function} Sets the state of the component calling this mixin
	 */
	_onChange: function() {
		var self = this,
			listeners = {};

		self.pageConfig().stores.forEach(function(store) {
			if (! store.hasOwnProperty('bindTo') || ! store.hasOwnProperty('action')) {
				return;
			}

			listeners[store.bindTo] = store.action();
		});

		return (
			self.setState(listeners, function() {
				self.pageConfig().stores.forEach(function(store) {
					if (store.hasOwnProperty('callback')) {
						store.callback();
					}
				});
			})
		);
	}

};

module.exports = ResourceComponentMixin;

