import  request  from "supertest/lib/test.js";
//import  request  from "supertest";
import reporter from "../helpers/reporter.js";
const Test = require('supertest/lib/test');
const app = express();
export async function GET(
  testid ,//: string,
  baseURL, //: string,
  endpoint, //: string,
  authToken, //: string,
  queryParam //: object,
) {
  if (!baseURL || !endpoint) {
    throw Error(`one of the values ${baseURL} and ${endpoint} is not valid`);
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a Get to ${endpoint}`);
  //const app = express();

  
  // try {
  //   let res= await  request("https://reqres.in")
  //     .get("/api/users?page=2")
  //     .query(queryParam)
  //     .auth(authToken, { type: "bearer" })
  //     .set("Content-Type", "application/json")
  //     .set("Accept", "application/json")
  //     console.log(`>>res:${JSON.stringify(res)}`)
  // } catch (err) {
  //   err.message = `Error in making a get request, ${endpoint}, ${err}`;
  //   throw err;
  // }

  try {
    const testInstance = new Test(app, 'GET', undefined);
    request("https://reqres.in").get(baseURL, (req, res) => {
      res.json({ users: ['user1', 'user2'] });
    });
    const Test = require('supertest/lib/test');
    //const testInstance = new Test(app, 'GET', endpoint);
    testInstance.expect(200)
    .end((err, res) => {
      if (err) throw err;
      console.log(res.body) // Output the response body
    });
  } catch (err) {
    err.message = `Error in making a get request, ${endpoint}, ${err}`;
     throw err;
  }
}

GET("TC001","https://reqres.in/","/api/users","",  {page: 2 });

//export { GET };
