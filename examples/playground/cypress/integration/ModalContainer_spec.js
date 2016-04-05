describe("ModalContainer", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080")
	});

	it("can navigate to ModalContainer", function () {
		cy.contains("Global Components").click();
		cy.contains("Modal Container").click()
			.hash().should("eq", "#/components/modalcontainer")
			.get("h1").should("contain", "Modal Container")
	});


	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/modalcontainer")
	});

	it("can open the modal", function () {
		cy.get('button').contains("Open Modal").click();
		cy.get('.modal-dialog').should("contain", "This is a Mortar Modal")
	});

	it("can close the modal with the Close button", function () {
		cy.get('button').contains("Open Modal").click();
		cy.get('.modal-dialog').get('button').contains('Close').click();
		cy.get('.modal-component').siblings().should('not.have.class','.modal-content');
	});

	it("can close the modal with the x button", function () {
		cy.get('button').contains("Open Modal").click();
		cy.get('.modal-header').get('.close').click();
		cy.get('.modal-component').siblings().should('not.have.class','.modal-content');
	});
});