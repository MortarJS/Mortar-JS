describe("Table", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080");
	});

	it("can navigate to Table", function () {
		cy.contains("Visualization Components").click();
		cy.contains("Table").click()
			.hash().should("eq", "#/components/table")
			.get("h1").should("contain", "Table");
	});

	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/table")
	});

  context("Navigate to Default Table", function () {
    it("can navigate to 'default' from tab options", function () {
      cy.get(".btn-group").within(function () {
        cy.contains("default");
      });
    });
  });
});
