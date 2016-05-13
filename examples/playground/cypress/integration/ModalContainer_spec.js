describe("ModalContainer", function () {
	beforeEach(function () {
		cy.visit("http://localhost:21356");
	});

	it("can navigate to ModalContainer", function () {
		cy.contains("Global Components").click();

		cy.contains("Modal Container").click()
			.hash().should("eq", "#/components/modalcontainer")
			.get("h1").should("contain", "Modal Container");
	});

	beforeEach(function () {
		cy.visit("http://localhost:21356/#/components/modalcontainer");
	});

	context("Basic functionality", function() {
		it("can open", function () {
			cy.get('button')
				.contains("Open Modal")
				.click();

			cy.get('.mortar-modal-dialog')
				.should("contain", "This is a Mortar Modal");
		});

		it("can close with the Close button", function () {
			cy.get('button')
				.contains("Open Modal")
				.click();

			cy.get('.mortar-modal-dialog')
				.get('button')
				.contains('Cancel')
				.click();

			cy.get('.mortar-modal-component').should(function($p) {
				expect($p.children())
					.to.have.length(0);
			});
		});

		it("can close with the X button", function () {
			cy.get('button').contains("Open Modal").click();

			cy.get('.mortar-modal-header').get('.close').click();

			cy.get('.mortar-modal-component').should(function($p) {
				expect($p.children()).to.have.length(0);
			});
		});

		it("can close by clicking outside the modal", function () {
			cy.get('button').contains("Open Modal").click();

			cy.get('#page-content').click(15, 40);

			cy.get('.mortar-modal-component').should(function($modal) {
				expect($modal.children()).to.have.length(0);
			});
		});

		it("can close by hitting the ESC key", function () {
			cy.get('button').contains("Open Modal").click();
			cy.get('input').first().type("{esc}", {force: true});

			cy.get('.mortar-modal-component').should(function($modal) {
				expect($modal.children()).to.have.length(0);
			});
		});
	});

	context("Customization", function() {
		it("can have a variable title", function() {
			cy.get('form')
				.find("input")
				.eq(0)
				.clear()
				.type('The Dude abides.');

			cy.get('button')
				.contains("Open Modal")
				.click();

			cy.get('.mortar-modal-title')
				.should("contain", "The Dude abides.");
		});

		it("can have variable confirm button text", function() {
			cy.get('form').find("input").eq(1).clear().type('Let\'s go bowling.');
			cy.get('button').contains("Open Modal").click();

			cy.get('.mortar-modal-footer')
				.children()
				.eq(1)
				.should("contain", "Let\'s go bowling.");
		});

		it("can have variable cancel button text", function() {
			cy.get('form').find("input").eq(2).clear().type('Mark it zero!');
			cy.get('button').contains("Open Modal").click();

			cy.get('.mortar-modal-footer')
				.children()
				.eq(0)
				.should("contain", "Mark it zero!");
		});

		it("can have variable width", function() {
			cy.get('form').find("input").eq(3).clear().type('300');
			cy.get('button').contains("Open Modal").click();

			cy.get('.mortar-modal-component').should(function($modal) {
				expect(Cypress.$('.mortar-modal-dialog').width()).to.equal(300);
			});
		});

		it("can have the confirm button be disabled", function() {
			cy.get('form').find("input").eq(4).check({force:true});
			cy.get('button').contains("Open Modal").click();

			cy.get('.mortar-modal-footer')
				.children()
				.eq(1)
				.should("be.disabled");
		});

		it("can be kept open", function() {
			cy.get('form').find("input").eq(5).check({force:true});
			cy.get('button').contains("Open Modal").click();
			cy.get('#page-content').click(15, 40);

			cy.get('.mortar-modal-dialog')
				.should("contain", "This is a Mortar Modal");
		});
	});
});
