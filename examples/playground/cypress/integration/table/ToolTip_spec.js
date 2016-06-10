describe("ToolTip", () => {
	beforeEach(() => {
		cy.visit("http://localhost:21356/#/components/table");
		cy.get(".btn-group").within(function () {
			cy.contains("tooltip")
				.click();
		});
	});

	context("Rendering", () => {
		it("renders a table with tooltips", function () {
			cy.get(".table-responsive").within(function () {
				cy.get(".mortar-tooltip-container")
					.first()
					.children()
					.should("have.class", "mortar-tooltip bottom");

				cy.get(".mortar-tooltip-container")
					.last()
					.children()
					.should("have.class", "mortar-tooltip top");

			});
		});
	})

});
