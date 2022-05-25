import http from "http";

http.createServer((request, response) => {
  response.end("Hello World!!");
})
  .listen(5000, () => console.log("Server is listen in the port 5000!"));