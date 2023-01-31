const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("./config/mongoConnection");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

mongoConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
