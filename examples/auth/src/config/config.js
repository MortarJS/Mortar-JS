/**
 * General CMS configuration
 *
 * @type {{baseUrl: string}}
 */
module.exports = {
	base: require('./base-config'),

	header: {
		title   : 'Mortar JS',
		homepage: 'http://mortar.fuzzpro.com',
		buttons : []
	},

	navbar: [
		{
			"buttonName": "Home",
			"href"      : "/#/"
		}
	]
};
