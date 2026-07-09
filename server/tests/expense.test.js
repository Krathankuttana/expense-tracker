const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Expense API", () => {
  const testUser = {
    name: "Expense Tester",
    email: `expensetester_${Date.now()}@example.com`,
    password: "password123",
  };
  let token;
  let createdExpenseId;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should reject requests without a token", async () => {
    const res = await request(app).get("/api/expenses");
    expect(res.statusCode).toBe(401);
  });

  it("should create a new expense", async () => {
    const res = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Groceries", amount: 45.5, category: "Food", note: "Weekly shop" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("Groceries");
    createdExpenseId = res.body.data._id;
  });

  it("should fetch expenses for the logged-in user", async () => {
    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should update an expense", async () => {
    const res = await request(app)
      .put(`/api/expenses/${createdExpenseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 50 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.amount).toBe(50);
  });

  it("should delete an expense", async () => {
    const res = await request(app)
      .delete(`/api/expenses/${createdExpenseId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
