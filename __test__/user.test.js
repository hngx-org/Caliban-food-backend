const supertest = require("supertest");
const createServer = require("http").createServer;
const startApp = require("../app");
const testDatabase = require("./dbConnect"); // Import the test database configuration
const { dbConnection } = require("../utils/database/dbConnection");
const { SignUp } = require("./body.json/user.body")

const app = createServer(startApp);

beforeAll(async () => {
  // Establish a connection to the test database
  await testDatabase.authenticate();
  console.log("Connected to the test database");

  // Initialize your database tables or perform any setup needed for testing
  // For example:
  // await testDatabase.sync(); // This will create tables based on your Sequelize models

  // Optionally set the environment variable NODE_ENV to 'test'
  process.env.NODE_ENV = "test";

  // Open the connection to the app's database
  await dbConnection();
}, 30000);

afterAll(async () => {
    // Close the connections and release resources
    await testDatabase.close();
  });
  
describe("Test App Functionalities", ()=> {
    describe("Testing User Routes", () =>{
        // Register
        test.only("SignUp user", async () => {
            const result = await supertest(app)
                    .post("/api/signup")
                    .send(SignUp)
            
            console.log(result.error)
            value.key1 = result.body.user.id
            value.key2 = result.body.token
            
            expect(result.statusCode).toBe(201)
            expect(result.body.user).toMatchObject({
                id : expect.any(Number),
                email: expect.any(String),
                password: expect.any(String),
                org_id: expect.any(Number),
                firstName: expect.any(String),
            })
        }, 15000)

        test("Existing user", async () => {
            const result = await supertest(app)
                    .post("/api/signup")
                    .send(SignUp)
            
            expect(result.statusCode).toBe(422)
            expect(result.body.error).toBe("Email is already in use")
        })

        // Login
        test("Wrong login Credentials", async () => {
            const result = await supertest(app)
                .post("/api/login")
                .send({ email: "dagger@gmail.com", password: "569484" })
                .set('Authorization', `Bearer ${value.key2}`)

            expect(result.statusCode).toBe(422)
            expect(result.body.error).toEqual("Invalid email or password")
        })

        test("Login user",async () => {
            const result = await supertest(app)
                    .post("/api/login")
                    .send(login)
                    .set('Authorization', `Bearer ${value.key2}`)


            value.key = result.body.Member_id
            value.key3 = result.body.token // login token
            expect(result.statusCode).toBe(200)
            expect(result.body).toEqual({
                success: true,
                user: expect.toMatchObject({ 
                    id : expect.any(Number),
                    email: expect.any(String),
                    password: expect.any(String),
                    org_id: expect.any(Number),
                    firstName: expect.any(String),
                }),
                token: expect.any(String)
            })
        })

        // // Get Profile
        // test("Get My Profile", async () => {
        //     const result = await supertest(app)
        //         .get("/api/v1/members/")
        //         .set('Authorization', `Bearer ${value.key2}`)

        //         // console.info(result.body)
        //     expect(result.statusCode).toBe(201)
        //     expect(result.body.message).toEqual(MESSAGES.USER.FETCHED)
        //     expect(result.body).toMatchObject({ success: true });
        // })

        // // Update
        // test("Update Member", async () => {
        //     const result = await supertest(app)
        //         .patch("/api/v1/members/")
        //         .send({ married: true, level: "5", state_of_origin: "Anambra", LGA: "Njikoka" })
        //         .set('Authorization', `Bearer ${value.key2}`)

        //     expect(result.statusCode).toBe(200)
        //     expect(result.body.message).toEqual(MESSAGES.USER.UPDATED)
        //     expect(result.body).toMatchObject({ success: true });
        // })

    })
})