describe("Mutator Table", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/table");
		cy.get(".btn-group").within(function () {
			cy.contains("mutator")
				.click();
		});
	});

	context("Renders Mutated Data Table", function () {
		it("has mutated data and not unmutated data", function () {
			cy.get(".table-responsive").last().within(function () {
				cy.get(".table-row")
					.first()
					.should("contain", "Darth Vader")
					.should("contain", "January 17, 1931")
					.should("not.contain", "1931-01-17T18:35:24+00:00")
					.should("contain", "TIE Fighter")
					.should("not.contain", "[\"TIE Fighter\"]");
				cy.get(".table-row")
					.last()
					.should("contain", "R2-D2")
					.should("contain", "January 1, 1970")
					.should("not.contain", "1970-01-01T18:35:24+00:00")
					.should("contain", "X-wing Starfighter, Jedi Starfighter")
					.should("not.contain", "[\"X-wing Starfighter\", \"Jedi Starfighter\"]");
			});
		});
	});
});
