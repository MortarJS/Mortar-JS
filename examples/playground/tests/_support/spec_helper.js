// ***********************************************
// This example spec_helper.js shows you how to
// create the custom command: 'login'.
//
// The spec_helper.js file is a great place to
// add reusable logic / custom commands which
// become usable in every single test file.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************
//
// Cypress.addParentCommand("login", function(email, password){
//   var email    = email || "joe@example.com"
//   var password = password || "foobar"
//
//   var log = Cypress.Log.command({
//     name: "login",
//     message: [email, password],
//     onConsole: function(){
//       return {
//         email: email,
//         password: password
//       }
//     }
//   })
//
//   cy
//     .visit("/login", {log: false})
//     .contains("Log In", {log: false})
//     .get("#email", {log: false}).type(email, {log: false})
//     .get("#password", {log: false}).type(password, {log: false})
//     .get("button", {log: false}).click({log: false}) //this should submit the form
//     .get("h1", {log: false}).contains("Dashboard", {log: false}) //we should be on the dashboard now
//     .url({log: false}).should("match", /dashboard/, {log: false})
//     .then(function(){
//       log.snapshot().end()
//     })
// })