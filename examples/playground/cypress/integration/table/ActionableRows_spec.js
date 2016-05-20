describe("Actionable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
	});

	context("Navigate to Actionable Rows Table", function () {
		it("can navigate to 'actionable rows' from tab options", function () {
			cy.get(".btn-group").within(function () {
				cy.contains("actionable rows").click();
			});
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
				.first()
				.should("contain", "Darth Vader");
				cy.get(".table-row")
				.first()
				.contains("edit")
				.click();
			});
		});
	});
});
