const http = require('http');

const server = http.createServer(function (req, res) {
    if(req.url == "/hello") {
        res.writeHead(200, {'Content-Type': "text/plain; charset=utf-8"});
        res.write("你好");
        console.log("你好");
        res.end();
    }
    else if(req.url == "/name") {
        res.writeHead(200, {'Content-Type': "text/plain; charset=utf-8"});
        res.write("馮志揚");
        console.log("馮志揚");
        res.end();
    }
    else if(req.url == "/id") {
        res.writeHead(200, {'Content-Type': "text/plain; charset=utf-8"});
        res.write("110510524");
        console.log("110510524");
        res.end();
    }
    else {
        res.writeHead(404, {'Content-Type': "text/plain"});
        res.end();
    }
})

server.listen(3000);

console.log('Server running at http://localhost:3000');