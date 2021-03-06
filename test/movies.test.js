var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/movies", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("Should Find All Movies", function(done) {
    // Add some examples to the db to test with
    db.Movie.bulkCreate([
      { imdbID: "aaaaaa", Title: "First Movie" },
      { imdbID: "bbbbbb", Title: "Second Movie" }
    ]).then(function() {
      // Request the route that returns all examples
      request.post("/api/movies").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody).to.be.an("array");

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ imdbID: "aaaaaa", Title: "First Movie" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ imdbID: "bbbbbb", Title: "Second Movie" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

// Create a New User
describe("POST /users/register", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true, logging: false });
  });

  it("It Should Add a New User", function(done) {
    // Request the route that returns all examples
    var newUser = {
      name: "test",
      username: "Test Test",
      email: "test@test.com",
      password: "1234",
      password2: "1234"
    };

    request
      .post("/users/register")
      .send(newUser)
      .end(function(err, res) {
        var responseStatus = res.status;
        // var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody).to.be.an("array");

        // expect(responseBody)
        //   .to.be.an("array")
        //   .that.has.lengthOf(1);

        // expect(responseBody[0])
        //   .to.be.an("object")
        //   .that.includes({ imdbID: "aaaaaa", Title: "First Movie" });

        // expect(responseBody[1])
        //   .to.be.an("object")
        //   .that.includes({ imdbID: "bbbbbb", Title: "Second Movie" });

        // // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

// // Query A New Movie and Add it to the User
// describe("POST /api/movieadd", function() {
//   // Before each test begins, create a new request server for testing
//   // & delete all examples from the db
//   beforeEach(function() {
//     request = chai.request(server);
//     return db.sequelize.sync({ force: true, logging: false });
//   });

//   it("It Should Add a New User", function(done) {
//     // Request the route that returns all examples
//     var movie = {
//       imdbID: ""
//     };

//     request
//       .post("/api/movieadd")
//       .send(movie)
//       .end(function(err, res) {
//         var responseStatus = res.status;
//         // var responseBody = res.body;

//         // Run assertions on the response

//         expect(err).to.be.null;

//         expect(responseStatus).to.equal(200);

//         // expect(responseBody).to.be.an("array");

//         // expect(responseBody)
//         //   .to.be.an("array")
//         //   .that.has.lengthOf(1);

//         // expect(responseBody[0])
//         //   .to.be.an("object")
//         //   .that.includes({ imdbID: "aaaaaa", Title: "First Movie" });

//         // expect(responseBody[1])
//         //   .to.be.an("object")
//         //   .that.includes({ imdbID: "bbbbbb", Title: "Second Movie" });

//         // // The `done` function is used to end any asynchronous tests
//         done();
//       });
//   });
// });
