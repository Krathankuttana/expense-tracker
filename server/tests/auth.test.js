const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

// NOTE: These tests expect a TEST MongoDB URI in process.env.MONGO_URI
// (see .env.example). Run with: npm test
// It's recommended to point MONGO_URI at a separate test database/cluster.

describe("Auth API", () => {
  const testUser = {
    name: "Test User",
    email: `testuser_${Date.now()}@example.com`,
    password: "password123",
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  it("should not sign up a user with an existing email", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should reject login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
  });
});
