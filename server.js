const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

app.listen(3000);
