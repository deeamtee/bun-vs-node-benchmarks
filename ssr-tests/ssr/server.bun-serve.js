const { createElement } = require("react");
const { renderToString } = require("react-dom/server");
const { App } = require("./app.js");
const PORT = Number(process.env.PORT || 3010);

Bun.serve({
  port: PORT,
  fetch(req) {
    const body = renderToString(createElement(App));
    return new Response(body, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-transform",
        "Extra": "Hello Frontend from Bun SSR server with React",
      },
    });
  },
  error(err) {
    return new Response(err.stack, { status: 500 });
  },
});

console.log(`Bun UWS server has started on port ${PORT}`);