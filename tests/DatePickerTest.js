var jsdom  = require('mocha-jsdom'),
	expect = require('chai').expect,
	moment = require('moment');

function getComponentType(renderedComponent) {
	return renderedComponent._reactInternalInstance._currentElement.type;
}

function getComponentClasses(renderedComponent) {
	return renderedComponent.props.className;
}

describe('Time', function() {
	function find(component, className) {
		return TestUtils.findRenderedDOMComponentWithClass(component, className);
	}

	jsdom();
	var React      = require('react/addons'),
		TestUtils  = React.addons.TestUtils,
		DatePicker = require('../lib/components/resource-editing/resource-form/Time/DatePicker');

	describe('DatePicker', function() {
		var date_picker,
			date_picker_rendered;

		it('should render', function() {
			date_picker = TestUtils.renderIntoDocument(<DatePicker fieldKey="fieldKey"/>);
			date_picker_rendered = find(date_picker, 'input-calendar');

			expect(TestUtils.isDOMComponent(date_picker_rendered)).to.be.true;
			expect(getComponentType(date_picker_rendered)).to.equal('div');
		});

		it('should accept user-defined classes', function () {
			// @todo
			//date_picker = TestUtils.renderIntoDocument(<DatePicker fieldKey="fieldKey" classes="its-working" />);
			//date_picker_rendered = find(date_picker, 'input-calendar');
			//
			//console.log(date_picker);
			//expect(getComponentClasses(date_picker_rendered)).to.equal('input-calendar its-working')
		});

		it('should accept child props', function () {
			var date = moment(),
			    minView = 1,
			    closeOnSelect = false,
			    openOnInputFocus = false;

			date_picker = TestUtils.renderIntoDocument(
				<DatePicker fieldKey="fieldKey"
				date={date}
				format="MM/DD/YYYY"
				minView={minView}
				computableFormat="YYYY-MM-DD"
				closeOnSelect={closeOnSelect}
				openOnInputFocus={openOnInputFocus} />);
			date_picker_rendered = find(date_picker, 'input-calendar');

			console.log(date_picker.props);
			// @todo test for date picker props
			expect();
		});

	});
});
