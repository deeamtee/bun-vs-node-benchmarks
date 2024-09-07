const http = require("node:http");
const { createElement } = require("react");
const { renderToString } = require("react-dom/server");
const { App } = require("./app.js");

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  const body = renderToString(createElement(App));
  res
    .writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "no-transform",
      // Extra: "Hello Frontend from Bun SSR server using React", // For bun-http
    })
    .end(body);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => console.log(`Node HTTP server has started on port ${PORT}`));
