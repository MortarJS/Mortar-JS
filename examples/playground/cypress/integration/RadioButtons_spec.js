describe("RadioButtons [009]", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080")
	});

	it("can navigate to RadioButtons", function () {
		cy.contains("Form Components").click();
		cy.contains("Radio Buttons").click()
			.hash().should("eq", "#/components/radio")
			.get("h1").should("contain", "Radio Buttons")
			.get("h3").should("contain", "Radio Buttons")
			.get("h3").should("contain", "Disabled Radio Buttons")
	});


	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/radio")
	});

	it("can select a season and show it's been selected", function () {
		cy.contains("Select a Season").get("[type='radio']");
	});

	it("can't select a color", function () {
		cy.contains("Select a Color")
			.get("[type='radio']").should("be.disabled");

	});
});
