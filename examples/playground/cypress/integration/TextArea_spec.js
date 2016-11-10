describe("Text Area", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356")
	});

	it("can navigate to Text Area", function () {
		cy.contains("Text Area").click({force: true})
			.hash().should("eq", "#/components/textarea")
			.get("h1").should("contain", "Text Area");
	});


	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/textarea");
	});

	it("can type into the text area", function () {
		cy.contains("Comment")
			.get("textarea[placeholder='Sample text area component. Type away!']")
			.type('I really like MortarJS!');
	});

	it("can't type in disabled text areas", function () {
		cy.contains("Complaints")
			.get("textarea[disabled]").should('be.disabled');
	});
});
