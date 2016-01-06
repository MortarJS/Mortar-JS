var jsdom  = require('mocha-jsdom'),
	expect = require('chai').expect,
	Helpers = require('./helpers/helpers');

var h = new Helpers();

describe('Page Structure', function() {

	jsdom();
	var React     = require('react/addons'),
		TestUtils = React.addons.TestUtils,
		Row       = require('../lib/components/page-structure/Row'),
		Column    = require('../lib/components/page-structure/Column');

	describe('Row', function() {
		it('should render', function() {
			var row = TestUtils.renderIntoDocument(<Row />);
			var row_rendered = h.find(row, 'row');

			expect(TestUtils.isDOMComponent(row_rendered)).to.be.true;
			expect(h.getComponentType(row_rendered)).to.equal('div');
		});

		it('should render child components', function() {
			var row = TestUtils.renderIntoDocument(
				<Row>
					<h1 className="page-title">Admins</h1>
					<div>
						<p>content</p>
					</div>
				</Row>
			);
			var row_rendered = h.find(row, 'row');

			expect(row_rendered.props.children[0].type).to.equal('h1');
			expect(row_rendered.props.children[0].props).to.be.an('object').and.to.deep.equal({ className: 'page-title', children: 'Admins'});
			expect(row_rendered.props.children[1].type).to.equal('div');
			expect(row_rendered.props.children[1].props.children).to.be.an('object');
			expect(row_rendered.props.children[1].props.children.type).to.equal('p');
			expect(row_rendered.props.children[1].props.children.props.children).to.equal('content');
		});
	});

	describe('Column', function() {
		it('should have grid sizes of "xs", "sm", "md", "lg" and accepted column sizes', function() {
			var col_xs = TestUtils.renderIntoDocument(<Column grid="xs" size="3"  />);
			var col_sm = TestUtils.renderIntoDocument(<Column grid="sm" size="6"  />);
			var col_md = TestUtils.renderIntoDocument(<Column grid="md" size="9"  />);
			var col_lg = TestUtils.renderIntoDocument(<Column grid="lg" size="12" />);

			// @TODO: how can we test invalid column sizes?
			var col_xs_rendered = h.find(col_xs, 'col-xs-3');
			var col_sm_rendered = h.find(col_sm, 'col-sm-6');
			var col_md_rendered = h.find(col_md, 'col-md-9');
			var col_lg_rendered = h.find(col_lg, 'col-lg-12');

			expect([col_xs_rendered, col_sm_rendered, col_md_rendered, col_lg_rendered]).to.be.ok;
			expect(h.getComponentClasses(col_xs_rendered)).to.equal('col-xs-3 ');
			expect(h.getComponentType(col_sm_rendered)).to.equal('div');
		});

		it('should accept user-defined classes', function() {
			var col = TestUtils.renderIntoDocument(<Column grid="lg" size="12" classes="its working" />);
			var col_rendered = h.find(col, 'col-lg-12');

			expect(h.getComponentClasses(col_rendered)).to.equal('col-lg-12 its working');
		});

		it('should render child elements', function() {
			var col = TestUtils.renderIntoDocument(
				<Column grid="lg" size="12">
					<h1 className="page-title">Admins</h1>
					<div>
						<p>content</p>
					</div>
				</Column>
			);
			var col_rendered = h.find(col, 'col-lg-12');

			expect(col_rendered.props.children[0].type).to.equal('h1');
			expect(col_rendered.props.children[0].props).to.be.an('object').and.to.deep.equal({ className:'page-title', children: 'Admins' });
			expect(col_rendered.props.children[1].type).to.equal('div');
			expect(col_rendered.props.children[1].props.children.type).to.equal('p');
			expect(col_rendered.props.children[1].props.children.props.children).to.equal('content');
		});
	});
});
