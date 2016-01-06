// when requiring Form, mocha complains about not FizzyWig.
var jsdom  = require('mocha-jsdom'),
	expect = require('chai').expect,
	Helpers = require('./helpers/helpers');

var h = new Helpers();

describe('Form', function() {
	jsdom();
	var React     = require('react/addons'),
		TestUtils = React.addons.TestUtils,
		Checkbox  = require('../lib/components/resource-editing/resource-form/Checkbox');

	describe('Checkbox', function() {
		var checkbox,
			checkbox_rendered,
			options = ['options'];

		beforeEach(function () {
			checkbox = TestUtils.renderIntoDocument(<Checkbox options={options} fieldKey="fieldKey" />);
			checkbox_rendered = h.find(checkbox, 'checkbox');
		});

		it('should render', function() {
			expect(TestUtils.isDOMComponent(checkbox_rendered)).to.be.true;
			expect(h.getComponentType(checkbox_rendered)).to.equal('div');
		});

		it('should accept user-defined classes', function () {
			checkbox = TestUtils.renderIntoDocument(<Checkbox options={options} fieldKey="fieldKey" className="its-working" />);

			// @todo: should this be the case? does the checkbox allow classes?
			expect(h.getComponentClasses(checkbox_rendered)).to.equal('checkbox');
		});

		it('should allow you to select options', function () {

		});

		it('should allow you to select multiple options', function () {

		});

		it('should allow a disabled state', function () {
			checkbox = TestUtils.renderIntoDocument(<Checkbox options={options} fieldKey="fieldKey" disabled={true} />);

		});

	});
});
