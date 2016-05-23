describe("Actionable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
	});

	context("Navigate to Sprinner Table", function () {
		it("can navigate to 'spinner' from tab options", function () {
			cy.get(".btn-group").within(function () {
				cy.contains("spinner").click();
			});

			cy.get(".table-responsive")
				.find(".spinner-loader")
				.should("exist");
		});

		it("can navigate to 'spinner' from tab options and toggle spinner off", function () {
			cy.get(".btn-group").within(function () {
				cy.contains("spinner").click();
			});

			cy.get(".mortar-toggle").within(function () {
				cy.get("label")
					.last()
					.click();
			})

			cy.get(".table-responsive")
				.find(".table-empty-row")
				.should("exist");
		});
	});
});
