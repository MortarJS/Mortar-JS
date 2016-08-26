describe("Input", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356");
	});

	it("can navigate to Input", function () {
		cy.contains("Input").click({force: true})
			.hash().should("eq", "#/components/input")
			.get("h1").should("contain", "Input");
	});


	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/input");
	});

	it("can type username in input field", function () {
		cy.contains("Username")
			.get("input")
			.first()
			.type('lskywalker');
	});

	it("can't type email in the disabled input field", function () {
		cy.contains("Email")
			.get("input[disabled]")
			.should('be.disabled');
	});
});
