var React     = require('react/addons'),
	TestUtils = React.addons.TestUtils;

var Helpers = function() {

};

Helpers.prototype.getComponentType = function(renderedComponent) {
	return renderedComponent._reactInternalInstance._currentElement.type;
}

Helpers.prototype.getComponentClasses = function(renderedComponent) {
	return renderedComponent.props.className;
};

Helpers.prototype.find = function(component, className) {
	return TestUtils.findRenderedDOMComponentWithClass(component, className);
}

module.exports = Helpers;
