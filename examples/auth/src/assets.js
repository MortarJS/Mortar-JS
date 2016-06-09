/**
 * Global scrips
 * @type {exports}
 */
global.jQuery = require('jquery');
require('bootstrap');
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
 * Javascript
 * @type {exports}|string
 */
//require('imports!metismenu/dist/metisMenu.js');
//require('imports!./menu.js');

/**
 * Images
 */
// require('images/*.png');
// require('images/*.jpg');
// require('images/*.jpeg');
