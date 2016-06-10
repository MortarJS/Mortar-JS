describe("Table Spinner", () => {
	beforeEach(() => {
		cy.visit("http://localhost:21356/#/components/table");
		cy.get(".btn-group").within(function () {
			cy.contains("spinner").click();
		});
	});

	context("Spinner Table", () => {
		it("has spinner", () => {
			cy.get(".table-responsive")
				.find(".spinner-loader")
				.should("exist");
		});

		it("can toggle spinner off", () => {
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
