describe("Actionable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/table");
	});

	context("Navigate to Sprinner Table", function () {
		it("can navigate to 'spinner' from tab options", function () {
			cy.get(".btn-group").within(function () {
				cy.contains("spinner").click();
			});

			cy.get(".table-responsive").find(".spinner-loader").should("exist");
		});
	});
});
