describe("Actionable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
		cy.get(".btn-group").within(function () {
			cy.contains("spinner").click();
		});
	});

	context("Navigate to Spinner Table", function () {
		it("has spinner loader", function () {
			cy.get(".table-responsive")
				.find(".spinner-loader")
				.should("exist");
		});

		it("can toggle spinner off", function () {
			cy.get(".mortar-toggle").within(function () {
				cy.get("label")
					.last()
					.click();
			});

			cy.get(".table-responsive")
				.find(".table-empty-row")
				.should("exist");
		});
	});
});
