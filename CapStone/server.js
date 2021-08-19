const fetch = require("node-fetch");
const express = require("express");
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 3001;

app.use(helmet());

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));

app.get("/users/:username", async (req, res) => {
  const username = req.params.username;

  const fetch_response_github = await fetch(
    `https://api.github.com/users/${username}`
  );

  const fetch_response_gitlab = await fetch(
    `https://gitlab.com/api/v4/users?username=${username}`
  );

  Promise.all([fetch_response_github, fetch_response_gitlab])
    .then((values) => {
      return Promise.all(values.map((r) => r.json()));
    })
    .then((values) => {
      res.send(values);
    })
    .catch((err) => console.log(err));
});
