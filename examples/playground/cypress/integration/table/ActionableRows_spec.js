describe("Actionable Rows", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
		cy.get(".btn-group").within(function () {
			cy.contains("actionable rows")
				.click();
		});
	});

	context("Interact with Actionable Rows", function () {
		it("can edit and save a user's name", function () {
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
					.first()
					.contains("edit")
					.click();
			});
			cy.get(".modal-component").within(function () {
				cy.contains("Name")
					.get("input")
					.first()
					.clear()
					.type('Dark Helmet');
				cy.get("button")
					.contains("Confirm")
					.click();
			});
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
					.first()
					.should("contain", "Dark Helmet");
			});
		});
		it("can edit and not save user's name", function () {
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
					.last()
					.contains("edit")
					.click();
			});
			cy.get(".modal-component").within(function () {
				cy.contains("Name")
					.get("input")
					.first()
					.clear()
					.type('Barf');
				cy.get("button")
					.contains("Close")
					.click();
			});
			cy.get(".table-responsive").within(function () {
				cy.get(".table-row")
					.last()
					.should("not.contain", "Barf");
			});
		});
	});
});
