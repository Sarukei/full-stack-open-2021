const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
// const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  // await Blog.deleteMany({});
  await User.deleteMany({});
  console.log("cleared");

  // const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());

  // await Promise.all(promiseArray);
  // console.log("done");
});

test("invalid users with password < 3 are not created and respond with 400", async () => {
  const newUser = helper.initialUsers[0];

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("non unique usernames responds with statuscode 400", async () => {
  const newUser = helper.initialUsers[1];
  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
