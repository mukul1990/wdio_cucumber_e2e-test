//import request from "../node_modules/supertest/lib/test.js";
import  express  from "express/lib/express.js";
import reporter from "./reporter.js";
import request from "supertest";
import Test from "supertest/lib/test.js";
import Server from "http"
const app = express();

// app.get("/api/users", (req, res) => {
//   res.json({ users: ["user1", "user2"] });
// });
console.log(typeof app)

export async function GET(endpoint,baseURL) {
  try {
    if (!endpoint) {
      throw Error(` ${endpoint} is not valid`);
    }

    //const testInstance = new Test(app, "GET", endpoint);
      // Ensure the app is associated with a server and has an address method
      if (baseURL) {
        // If baseURL is provided, make a request to the external API
       let res= await request(baseURL)
          .get(endpoint)
          .expect(200)
          // .end((err, res) => {
          //   if (err) throw err;
          //   console.log(res.body); // Output the response body
          // });
          console.log(JSON.stringify(res.body,null,2))
      // } else {
      //   // Ensure the app is associated with a server and has an address method
      //   if (!app.address) {
      //     const server = app.listen(0);
      //     app.address = () => server.address();
      //   }
      // }
  
        // Make the request to the local express app
        // request.expect(200)
        //   .end((err, res) => {
        //     if (err) throw err;
        //     console.log(res.body); // Output the response body
        //   });
    
    //const testInstance = new Test(app, "GET", endpoint);

    // Make the request using supertest
    // request(baseURL)
    //   .get(endpoint)
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     console.log(res.body); // Output the response body
    //   });

    // await testInstance.request(baseURL).get(endpoint)
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     console.log(res.body); // Output the response body
    //   });
}
 } catch (err) {
    err.message = `Error in making a get request, ${endpoint}, ${err.message}`;
    throw err;
  }
}

const baseURL = "https://reqres.in";
GET('/api/users',baseURL);

//export { GET };
