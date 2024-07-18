//import request from "../node_modules/supertest/lib/test.js";
import express, { application } from "express/lib/express.js";
import reporter from "./reporter.js";
import request from "supertest";
import Test from "supertest/lib/test.js";

const baseURL = "https://reqres.in";
const endpoint="/api/users"

export async function GET(testid, endpoint, baseURL, queryParam) {
  try {
    if (!endpoint || !baseURL) {
      throw Error(
        ` one of the parameter ${endpoint} or ${baseURL} is not valid`
      );
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid, "info", `Making a Get to ${endpoint}`);
    let res = await request(baseURL)
      .get(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .query(queryParam)
      .expect(200);

    console.log(JSON.stringify(res.body, null, 2));
  } catch (err) {
    err.message = `Error in making a get request, ${endpoint}, ${err.message}`;
    throw err;
  }
}

const queryParam = { page: 5 };
await GET("TC001", endpoint, baseURL, queryParam);

export async function POST(testid, baseURL,endpoint , payload) {
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
    let res = await request(baseURL)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
    console.log(JSON.stringify(res.body, null, 2));
  } catch (err) {
    err.message = `Error in making post request to ${endpoint}, ${err}`;
    throw err;
  }
}

let payload=
{
  "name": "morpheus",
  "job": "leader"
}

await POST("TC002",baseURL,endpoint,payload)
