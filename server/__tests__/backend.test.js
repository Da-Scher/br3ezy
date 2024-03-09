const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db/db");
const bcrypt = require("bcryptjs");
const User = require("../src/models/user");
const Stream = require("../src/models/stream");

describe("Black Box Acceptance Tests", () => {
  describe("Authentication Tests", () => {
    // Test 1: Acceptance test
    describe("Client Login", () => {
      it("should return a jwt token if username and password are correct", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .send({ username: "admin", password: "password" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data.token");
      });
    });

    // Test 2: Acceptance test
    describe("Client Registration", () => {
      it("should return a userId if username and email are unique", async () => {
        const response = await request(app).post("/api/auth/register").send({
          username: "user",
          email: "test@example.com",
          password: "password",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data.userId");
      });
    });
  });

  describe("Chat Tests", () => {
    // Test 3: Acceptance test
    describe("Fetch chat messages for given stream", () => {
      it("should return all messages if streamId exists in the database", async () => {
        const response = await request(app).get("/api/chat/messages/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data");
      });
    });

    // Test 4: Acceptance test
    describe("Add new chat message", () => {
      it("should return a messageId if userId and streamId exist in the database", async () => {
        const response = await request(app)
          .post("/api/chat/messages/add")
          .send({ userId: 1, streamId: 1, message: "Hello, World!" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data.messageId");
      });
    });
  });

  describe("Stream Tests", () => {
    // Test 5: Acceptance test
    describe("Add a new stream", () => {
      it("should return a streamId of added stream if userId exists in database", async () => {
        const response = await request(app).post("/api/stream/add").send({
          userId: 1,
          title: "Test Stream",
          description: "Test Desc",
          photo: "test.jpg",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data.streamId");
      });
    });

    // Test 6: Acceptance test
    describe("Get stream data", () => {
      it("should return stream associated with given streamId if it exists in the database", async () => {
        const response = await request(app).get("/api/stream/get/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data");
      });
    });

    // Test 7: Acceptance test
    describe("Search streams", () => {
      it("should return streams that match the given keyword", async () => {
        const response = await request(app).get(
          "/api/stream/search?keyword=stream",
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data");
      });
    });
  });
});

describe("White Box Tests", () => {
  describe("User Model", () => {
    const username = "testuser";
    const email = "test@example.com";
    const password = "password";
    const hashedPassword = "hashedpassword";
    const insertId = 2;
    const sampleUser = [
      {
        id: insertId,
        username: "existinguser",
        email: "existing@example.com",
        hashedPassword: "hashedpassword",
      },
    ];

    /* Test 8: White box test (along with Test 9, achieves full coverage)
     *
     * static async register(username, email, password) {
     *   await this.checkUser(username, email);
     *   const hashedPassword = await bcrypt.hash(password, 8);
     *   const [results] = await pool.query(
     *     "INSERT INTO Users (username, email, passwordHash) VALUES (?, ?, ?)",
     *     [username, email, hashedPassword],
     *   );
     *   return { userId: results.insertId };
     * }
     *
     */
    describe("register function", () => {
      it("should register a new user if username and email are unique", async () => {
        jest
          .spyOn(pool, "query")
          .mockResolvedValueOnce([[]])
          .mockResolvedValueOnce([{ insertId }]);
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce(hashedPassword);

        const result = await User.register(username, email, password);

        expect(pool.query).toHaveBeenCalledWith(
          "INSERT INTO Users (username, email, passwordHash) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
        );
        expect(result).toEqual({ userId: insertId });
      });

      it("should throw an error if username or email are not unique", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([sampleUser]);

        await expect(User.register(username, email, password)).rejects.toThrow(
          "Username or email already exist",
        );
      });
    });

    /* Test 9: White box test (achieves full coverage)
     *
     * static async checkUser(username, email) {
     *   const [rows] = await pool.query(
     *     "SELECT * FROM Users WHERE username = ? OR email = ?",
     *     [username, email],
     *   );
     *   if (rows.length > 0) throw new Error("Username or email already exist");
     * }
     *
     */
    describe("checkUser function", () => {
      it("should throw an error if the username or email already exist in the database", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([sampleUser]);

        await expect(User.checkUser(username, email)).rejects.toThrow(
          "Username or email already exist",
        );

        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM Users WHERE username = ? OR email = ?",
          [username, email],
        );
      });

      it("should not throw an error if the username or email doesn't exist in the database", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([[]]);

        await expect(User.checkUser(username, email)).resolves.not.toThrow();

        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM Users WHERE username = ? OR email = ?",
          [username, email],
        );
      });
    });

    /* Test 10: White box test (along with Test 11, achieves full coverage)
     *
     * static async login(username, password) {
     *   const user = await this.findByUsername(username);
     *   const isMatch = await bcrypt.compare(password, user.passwordHash);
     *   if (!isMatch) throw new Error("Invalid password");
     *   return { userId: user.id };
     * }
     *
     */

    describe("login function", () => {
      it("should login a user with valid credentials", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([sampleUser]);
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);

        const result = await User.login(username, password);

        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM Users WHERE username = ?",
          [username],
        );
        expect(result).toEqual({ userId: insertId });
      });

      it("should throw an error for invalid password during login", async () => {
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

        await expect(User.login(username, password)).rejects.toThrow(
          "Invalid password",
        );
      });

      it("should throw an error for no existing user during login", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([[]]);

        await expect(User.login(username, password)).rejects.toThrow(
          "User not found",
        );
      });
    });

    /* Test 11: White box test (achieves full coverage)
     *
     * static async findByUsername(username) {
     *   const [rows] = await pool.query(
     *     "SELECT * FROM Users WHERE username = ?",
     *     [username],
     *   );
     *   if (rows.length === 0) throw new Error("User not found");
     *   return rows[0];
     * }
     *
     */

    describe("findByUsername function", () => {
      it("should throw an error if the username doesn't exist in the database", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([[]]);

        await expect(User.findByUsername(username)).rejects.toThrow(
          "User not found",
        );

        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM Users WHERE username = ?",
          [username],
        );
      });

      it("should return the user if the username exists in the database", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce([sampleUser]);

        const user = await User.findByUsername(username);

        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM Users WHERE username = ?",
          [username],
        );
        expect(user).toEqual(user);
      });
    });
  });
});

describe("Integration Tests", () => {
  // Test 12: Integration Test for streamController.createStream and Stream.addStream (bottom-up)
  describe("Stream Controller Integration Test", () => {
    it("should add a new stream and return its ID", async () => {
      jest.spyOn(Stream, "createStream").mockResolvedValueOnce({ streamId: 1 });

      const response = await request(app).post("/api/stream/add").send({
        userId: 1,
        title: "Test Stream",
        description: "Test Desc",
        photo: "test.jpg",
      });

      expect(Stream.createStream).toHaveBeenCalledWith(
        1,
        "Test Stream",
        "Test Desc",
        "test.jpg",
      );

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data.streamId", 1);
    });
  });
});

afterAll(async () => {
  await pool.query('DELETE FROM Users WHERE username = "user"');
  await pool.query('DELETE FROM Messages WHERE body = "Hello, World!"');
  await pool.query('DELETE FROM Streams WHERE title = "Test Stream"');
  await pool.end();
});
