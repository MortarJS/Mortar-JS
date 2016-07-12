describe("Checkbox", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356");
	});

	it("can navigate to Checkbox", function () {
		cy.contains("Form Components").click();
		cy.contains("Checkbox").click()
			.hash().should("eq", "#/components/checkbox")
			.get("h1").should("contain", "Checkboxes");
	});

	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/checkbox");
	});

	context("Selecting Values", function() {
		it("can select a value and show it's been selected", function () {
			cy.get(".seasons-select")
				.first()
				.contains("Winter")
				.click();

			cy.get(".seasons-value")
				.should("contain", "Winter");
		});

		it("can select multiple values and show they've been selected", function () {
			cy.get(".seasons-select")
				.first()
				.contains("Winter")
				.click();

			cy.get(".seasons-select")
				.first()
				.contains("Summer")
				.click();

			cy.get(".seasons-value")
				.should("contain", "Winter, Summer");
		});

		it("can't select disabled checkboxes", function () {
			cy.get(".disabled-select")
				.find("[type='checkbox']").should("be.disabled");
		});
	});

	context("Removing Values", function() {
		it("can deselect a single value", function () {
			cy.get(".seasons-select")
				.first()
				.contains("Winter")
				.click()
				.click();

			cy.get(".seasons-value")
				.should("be.empty");
		});

		it("can deselect a multiple values", function () {
			cy.get(".seasons-select")
				.first()
				.find(".mortar-checkbox-label")
				.click({multiple: true});

			cy.get(".seasons-select")
				.first()
				.find(".mortar-checkbox-label")
				.click({multiple: true});

			cy.get(".seasons-value")
				.should("be.empty");
		});
	});
});
