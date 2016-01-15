var schma = require('js-schema');

/**
 * A very simple class that handles checking if a resource is valid against a schema
 * and passing back errors if it is not.
 *
 * When instantiated, binds the schema to the internal object for later validation.
 *
 * @class FormValidator
 *
 * @param {schema} schema A js-schema to validate the form's resource off of
 *
 * @memberOf FormComponents
 */
var FormValidator = function(schema) {
	this.schema = schema;

	/**
	 * Validates a resource against a FormValidator instance's schema.
	 * If there are no errors passes back 'false'.  Otherwise, returns an object of errors.
	 *
	 * @memberOf FormComponents.FormValidator
	 *
	 * @param {*} resource A resource to validate.
	 *
	 * @return {boolean|object}
	 */
	this.validate = function(resource) {
		return this.schema.errors(resource);
	}
}

module.exports = FormValidator;

