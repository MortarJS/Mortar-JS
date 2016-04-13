describe("RadioButtons", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080");
	});

	it("can navigate to RadioButtons", function () {
		cy.contains("Form Components").click();
		cy.contains("Radio Buttons").click()
			.hash().should("eq", "#/components/radio")
			.get("h1").should("contain", "Radio Buttons");
	});


	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/radio");
	});

	it("can select a season and show it's been selected", function () {
		cy.get(".season-select")
			.first()
			.contains("Winter")
			.click();

		cy.get(".season-value").should("contain", "Winter");
	});

	it("can change the selection by clicking another radio button", function() {
		cy.get(".season-select")
			.first()
			.contains("Winter")
			.click();
		cy.get(".season-select")
			.first()
			.contains("Fall")
			.click();

		cy.get(".season-value")
			.should("contain", "Fall");
	});

	it("can't select disabled radio buttons", function () {
		cy.get(".disabled-select")
			.get("[type='radio']")
			.should("be.disabled");

		cy.get(".disabled-value")
			.should("contain", "Pink")
	});
});
