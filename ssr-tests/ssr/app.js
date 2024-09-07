const { createElement } = require("react");

const App = () => {
  return createElement(
    "html",
    null,
    createElement(
      "body",
      null,
      createElement("h1", null, "Hello, Bun and Node.js!"),
      createElement(
        "p",
        null,
        "This is a server-side rendered page using React."
      )
    )
  );
};

module.exports = { App };
