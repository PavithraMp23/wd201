const http = require("http");
const fs = require("fs");
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const portNumber = args.port||3000;
const path = require('path');



let homeContent = "";
let projectContent = "";
let registrationContent="";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html",(err,reg)=>{
    if(err) throw err;
    registrationContent=reg;
})
http.createServer((request, response) => {
    let url = request.url;
    //for handling css and js
    if(url.endsWith(".js")||url.endsWith(".css")){
            const filePath = path.join(__dirname, url);
    const ext = path.extname(filePath);
    const contentType = ext === ".js" ? "application/javascript" : "text/css";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404);
        response.end("File not found");
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);
      }
    });
    return
    }

    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(portNumber);



