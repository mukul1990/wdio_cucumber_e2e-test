import request from "supertest";

console.log(`>>The type of rquest:${typeof request}`)
console.log(`number of args:${request.length}`)
console.log(`>>what is definition of the function:${request.toString()}`)