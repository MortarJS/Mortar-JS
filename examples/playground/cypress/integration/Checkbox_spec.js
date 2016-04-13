describe("Checkbox", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080");
	});

	it("can navigate to Checkbox", function () {
		cy.contains("Form Components").click();
		cy.contains("Checkbox").click()
			.hash().should("eq", "#/components/checkbox")
			.get("h1").should("contain", "Checkboxes");
	});

	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/checkbox");
	});

	it("can select a season and show it's been selected", function () {
		cy.contains("Select a Season").get("[type='checkbox']");
	});

	it("can't select disabled checkboxes", function () {
		cy.contains("Select a Color")
			.get("[type='checkbox']").should("be.disabled");
	});
});
