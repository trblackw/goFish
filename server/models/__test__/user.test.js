const User = require("../user");

describe("User model", () => {
  test("username is required", async () => {
    expect.assertions(1);
    try {
      await User.create({
        email: "student@gmail.com",
        password: "f777aaa829",
        city: "Raleigh",
        state: "North Carolina",
        zip: 27606
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("password is required", async () => {
    expect.assertions(1);
    try {
      await User.create({
        username: "jimJamboJangles",
        email: "student@gmail.com",
        city: "Raleigh",
        state: "North Carolina",
        zip: 27606
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("email is required", async () => {
    expect.assertions(1);
    try {
      await User.create({
        username: "jimJamboJangles",
        password: "f777aaa829",
        city: "Raleigh",
        state: "North Carolina",
        zip: 27606
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
