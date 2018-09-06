// http://localhost:3001/api/getAllUsers

// const expectedObject = {
//     user_id: 3,
//     auth_id: "google-oauth2|116533211054822610189",
//     name: "Jakey Wymes",
//     profile_pic: "https://jerbertjakelan.s3.amazonaws.com/collections/1535645502702.jpg",
//     city: "Fort Worth",
//     state: "TX"
// };

// const responseJSON = pm.response.json();

// pm.test("Status code is 200", function() {
// pm.response.to.have.status(200);
// });

// pm.test("Returned data is an array", function() {
// pm.expect(Array.isArray(responseJSON)).to.eql(true);
// });

// pm.test("Returned data is expected", function() {
// pm.expect(responseJSON[0]).to.eql(expectedObject);
// });

// pm.test("Returned data is expected", function() {
// pm.expect(responseJSON[0].name).to.eql(expectedObject.name);
// });

// pm.test("Returned data is expected", function() {
// pm.expect(responseJSON[0].users_id3).to.eql(expectedObject.user_id3);
// });

// pm.test("Returned data is an Array with length of 1", function() {
// pm.expect(Array.isArray(responseJSON)).to.eql(true);
// pm.expect(responseJSON.length).to.eql(5);
// });