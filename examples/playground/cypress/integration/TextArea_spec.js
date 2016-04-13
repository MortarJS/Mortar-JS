describe("Text Area", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080")
	});

	it("can navigate to Text Area", function () {
		cy.contains("Form Components").click();
		cy.contains("Text Area").click()
			.hash().should("eq", "#/components/textarea")
			.get("h1").should("contain", "Text Area")
			.get("h3").should("contain", "Text Area Input")
			.get("h3").should("contain", "Disabled Text Area Input")
	});


	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/textarea")
	});

	it("can type comment in input field", function () {
		cy.contains("Comment")
			.get("textarea[placeholder='Sample text area component. Type away!']").type('I really like MortarJS!')
	});

	it("can't type complaint in the disabled input field", function () {
		cy.contains("Complaints")
			.get("textarea[disabled]").should('be.disabled')
	});
});
