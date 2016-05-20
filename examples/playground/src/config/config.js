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
		},

		{
			"buttonName": "Form Components",
			"href"      : "",
			"children"  : [
				{
					"buttonName": "Input",
					"href"      : "#/components/input"
				},
				{
					"buttonName": "DropdownSelect",
					"href"      : "#/components/dropdown"
				},
				{
					"buttonName": "Radio Buttons",
					"href"      : "#/components/radio"
				},
				{
					"buttonName": "Toggle",
					"href"      : "#/components/toggle"
				},
				{
					"buttonName": "Checkbox",
					"href"      : "#/components/checkbox"
				},
				{
					"buttonName": "File Input",
					"href"      : "#/components/fileinput"
				},
				{
					"buttonName": "Type-Ahead Input",
					"href"      : "#/components/typeaheadinput"
				},
				{
					"buttonName": "Text Area",
					"href"      : "#/components/textarea"
				}
			]
		},

		{
			"buttonName": "Visualization Components",
			"href"      : "",
			"children"  : [
				{
					"buttonName": "Table",
					"href"      : "#/components/table"
				}
			]
		},

		{
			"buttonName": "Global Components",
			"href"      : "",
			"children"  : [
				{
					"buttonName": "Tooltip",
					"href"      : "#/components/tooltip"
				},
				{
					"buttonName": "ModalContainer",
					"href"      : "#/components/modalcontainer"
				},
				{
					"buttonName": "ButtonDrawer",
					"href"      : "#/components/buttondrawer"
				}
			]
		}
	]
};
