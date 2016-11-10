/**
 * Global scrips
 * @type {exports}
/**
 * Styles
 * @type {exports}|string
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('styles/css/material.css');
require('styles/main.scss');

require('normalize.css');

/**
 * Require CMS component styles. Load in after material css because it contains overrides.
 */
require('../../../lib/styles/main.scss');

/**
 * Optional spinners css
 */
require('../../../lib/styles/spinners.scss');

/**
 * Images
 */
// require('images/*.png');
// require('images/*.jpg');
// require('images/*.jpeg');
