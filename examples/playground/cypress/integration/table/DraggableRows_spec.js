describe("Draggable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
	});

// @TODO Dragging tests with Cypress
	context("Navigate to Draggable Rows Table", function () {
		it("can navigate to 'draggable rows' from tab options", function () {
			cy.get(".btn-group").within(function () {
				cy.contains("draggable rows").click();
			});
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
				.first()
				.should("contain", "Darth Vader");
			});
		});
	});
});
