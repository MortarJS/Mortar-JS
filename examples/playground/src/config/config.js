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
			"text" : "Home",
			"uri"  : "/"
		},

		{
			"text"     : "Form Components",
			"children" : [
				{
					"text" : "Input",
					"uri"  : "/components/input"
				},
				{
					"text" : "DropdownSelect",
					"uri"  : "/components/dropdown"
				},
				{
					"text" : "Radio Buttons",
					"uri"  : "/components/radio"
				},
				{
					"text" : "Toggle",
					"uri"  : "/components/toggle"
				},
				{
					"text" : "Checkbox",
					"uri"  : "/components/checkbox"
				},
				{
					"text" : "File Input",
					"uri"  : "/components/fileinput"
				},
				{
					"text" : "Type-Ahead Input",
					"uri"  : "/components/typeaheadinput"
				},
				{
					"text" : "Text Area",
					"uri"  : "/components/textarea"
				}
			]
		},

		{
			"text"     : "Visualization Components",
			"children" : [
				{
					"text" : "Table",
					"uri"  : "/components/table"
				}
			]
		},

		{
			"text"     : "Global Components",
			"children" : [
				{
					"text" : "Tooltip",
					"uri"  : "/components/tooltip"
				},
				{
					"text" : "ModalContainer",
					"uri"  : "/components/modalcontainer"
				},
				{
					"text" : "ButtonDrawer",
					"uri"  : "/components/buttondrawer"
				}
			]
		}
	]
};
