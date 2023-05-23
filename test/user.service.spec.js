const { userService } = require("../services");
const { User } = require("../models");

let userFindOne = {
	"_id" : "643e799764a66eba5fda63ba",
	"name" : "Test1",
	"email" : "test3@gmail.com",
	"phone" : "1234527891",
	"password" : "$2a$10$HkZyFEaCzXrlA042uEw7ouPEjA.qdBz1/yfFsG7Y.KVoL4.mflNV2",
	"created" : "2023-04-18T16:35:59.373+05:30",
	"modified" : "2023-04-18T16:35:59.373+05:30",
	"__v" : 0
}
beforeEach(() => {});
afterEach(() => {
  jest.clearAllMocks();
});
describe("Login", () => {
    test("Check Email Is Valid", async () => {
        let userName = "lalit@gmail.com";
        let data = await userService.checkIsEmail(userName);
        expect(data).toBe(true);
    })

    test("Check Email Is Not Valid", async () => {
        let userName = "lalitgmail.com";
        let data = await userService.checkIsEmail(userName);
        expect(data).toBe(false);
    })

    test("check email exists", async () => {
        jest.spyOn(User,"findOne").mockImplementation(() => Promise.resolve(userFindOne))
        let query = {email:"test3@gmail.com"};
        let data = await userService.getUser(query);
        expect(data.email).toEqual(query.email)
    })

    test("check email not exists", async () => {
        jest.spyOn(User,"findOne").mockImplementation(() => Promise.resolve())
        let query = {email:"lorem@gmail.com"};
        let data = await userService.getUser(query);
        expect(data).toBeUndefined()
    })
});
