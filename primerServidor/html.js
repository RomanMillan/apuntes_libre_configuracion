const http = require('http');


const host = 'localhost';
const port = 8000;

// JSON
/*
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message": "This is a JSON response"}`);
};
*/

//HTML
/*
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<h1>Hola mundo</h1>`);
};
*/
// CSV
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "")
    res.writeHead(200);
    res.end('nombre,ciudad\njuan,sevilla');
};


const server = http.createServer(requestListener);



server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
