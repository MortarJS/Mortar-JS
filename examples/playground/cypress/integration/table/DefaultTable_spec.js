describe("Table", () => {
	beforeEach(() => {
		cy.visit("http://localhost:21356");
	});

	it("can navigate to Table", () => {
		cy.contains("Visualization Components").click();
		cy.contains("Table").click()
			.hash()
			.should("eq", "#/components/table");
	});

	beforeEach(() => {
		cy.visit("http://localhost:21356/#/components/table");
	});

	context("Rendering", () => {
		it("renders a table", function () {
			expect(Cypress.$(".table-responsive")).to.have.descendants("table");
		});

		it("renders rows", () => {
			let table = Cypress.$("table");

			expect(table).to.have.descendants("tr");
			expect(table.find("tr")).to.have.length(7);
		});
	})

});
