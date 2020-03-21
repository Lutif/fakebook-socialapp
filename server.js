const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/api/router");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json({ useUrlExtended: false }));
//connect db
connectDB();
app.use("/api", router);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
