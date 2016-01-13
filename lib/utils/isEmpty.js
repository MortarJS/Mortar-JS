// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * A utility function that tests whether the passed variable is empty or not
 * Most useful for checking if an object is empty.
 *
 * @see {@link http://stackoverflow.com/questions/4994201/is-object-empty}
 *
 * @public
 * @global
 * @param {*} obj A variable to test if the value is empty or not
 *
 * @return {boolean}
 */
function isEmpty(obj) {

	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)    return false;
	if (obj.length === 0)  return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}

module.exports = isEmpty;
