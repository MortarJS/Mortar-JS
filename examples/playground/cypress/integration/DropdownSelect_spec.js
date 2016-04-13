describe("DropdownSelect", function () {
	beforeEach(function () {
		cy.visit("http://localhost:8080");
	});

	it("can navigate to DropdownSelect", function () {
		cy.contains("Form Components").click();
		cy.contains("DropdownSelect").click()
			.hash().should("eq", "#/components/dropdown")
			.get("h1").should("contain", "Dropdown Select");
	});


	beforeEach(function () {
		cy.visit("http://localhost:8080/#/components/dropdown");
	});

	context("Selecting Values", function() {
		it("can select a season and show it's been selected", function () {
			cy.contains("Select a Season").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Winter").click();
				});

			cy.contains("Season value:")
				.get("p").should("contain", "Winter");
		});

		it("will close after selecting a value for a single select", function () {
			cy.contains("Select a Season").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Winter").click();
				});

			cy.get(".dropdown-container").first()
				.should("have.class", "closed");
		});

		it("can select multiple colors and show they've been selected", function () {
			cy.contains("Select a Color").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Red").click();
					cy.contains("Taupe").click();
				});

			cy.contains("Colors value:")
				.get("p")
					.should("contain", "Red")
					.should("contain", "Taupe");
		});

		it("can only select the max number of values for the dropdown", function() {
			return false;
		});

	});

	context("Removing Values", function() {
		it("can swap values in a single select dropdown", function () {
			cy.contains("Select a Season").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Winter").click()
				});

			cy.get(".dropdown-container").contains("Winter").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Summer").click()
				});

			cy.contains("Season value:")
				.get("p").should("contain", "Summer");
		});

		it("can remove a value by clicking the x on the selected bubble", function () {
			cy.contains("Select a Color").click()
				.get(".dropdown-container").within(function () {
					cy.contains("Red").click();
					cy.contains("Taupe").click();
				});

			cy.get(".selected-option")
				.contains("Red")
				.siblings("a")
				.click();

			cy.contains("Colors value:")
				.get("p")
					.should("contain", "Taupe")
					.should("not.contain", "Red");

		});
	});


	context("Other", function() {
		it("can close an open dropdown by clicking outside of it", function() {
			cy.get(".dropdown-container").first()
				.click()
				.should("have.class", "open");

			cy.get("h1").click("topLeft");

			cy.get(".dropdown-container").first()
				.should("have.class", "closed");
		});
	});

});
