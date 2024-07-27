import reporter from "./reporter.js";
import request from "supertest";


const baseURL = "https://reqres.in";
const endpoint = "/api/users";

async function GET(testid, baseURL, endpoint, queryParam) {
  let res;
  try {
    if (!endpoint || !baseURL) {
      throw Error(
        ` one of the parameter ${endpoint} or ${baseURL} is not valid`
      );
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid, "info", `Making a Get to ${endpoint}`);
    res = await request(baseURL)
      .get(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .query(queryParam)
      .expect(200);

    //console.log(JSON.stringify(res.body, null, 2));
  } catch (err) {
    err.message = `Error in making a get request, ${endpoint}, ${err.message}`;
    throw err;
  }
  return res;
}

const queryParam = { page: 5 };
//await GET("TC001", baseURL,endpoint, queryParam);

async function POST(testid, baseURL, endpoint, payload) {
  let res
  try {
    if (!endpoint || !baseURL) {
      throw Error(
        `one of the parameter ${endpoint} or ${baseURL} is not valid`
      );
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    reporter.addStep(
      testid,
      "info",
      `Making a post request to an endpoint ${endpoint}`
    );
     res = await request(baseURL)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
    //console.log(JSON.stringify(res.body, null, 2));
  } catch (err) {
    err.message = `Error in making post request to ${endpoint}, ${err}`;
    throw err;
  }
  return res
}

let payload = {
  name: "morpheus",
  job: "leader",
};

//await POST("TC002",baseURL,endpoint,payload)

export default { GET, POST };
