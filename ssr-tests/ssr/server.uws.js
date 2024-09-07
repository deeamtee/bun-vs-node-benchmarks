const { createElement } = require("react");
const { renderToString } = require("react-dom/server");
const { App } = require("./app.js");

const PORT = Number(process.env.PORT || 3020);

require("uWebSockets.js")
  .App()
  .get("/*", (res, req) => {
    const body = renderToString(createElement(App));
    res
      .writeStatus("200 OK")
      .writeHeader("Content-Type", "text/html")
      .writeHeader("Cache-Control", "no-transform")
      .writeHeader("Extra","Hello Frontend from Bun+React")
      .end(body);
  })
  .listen(PORT, () => console.log(`Node UWS server has started on port ${PORT}`));
