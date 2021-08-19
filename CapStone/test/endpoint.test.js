let expect = require("chai").expect;
let request = require("request");

//checks that a certain piece of data is returned for the given username
describe("User data", function () {
  it("login info", function (done) {
    request(
      "http://localhost:3001/users/gregxhill",
      function (error, response, body) {
        expect(body[0].login).to.equal("Gregxhill");
        done();
      }
    );
  });
});

//this test checks whether or not the server responds with a status code of 200
describe("Response Status", function () {
  it("status", function (done) {
    request(
      "http://localhost:3001/users/gregxhill",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});
