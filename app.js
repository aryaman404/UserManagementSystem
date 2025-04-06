const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ undefined: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createduser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let allUser = await userModel.find();
  res.render("read", { user: allUser });
});
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user: user });
});
app.post("/update/:id", async (req, res) => {
  let { image, name, email } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { image, name, email },
    { new: true }
  );
  res.redirect("/read");
});
app.get("/delete/:id", async (req, res) => {
  let allUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});
app.listen(3000, (req, res) => {
  console.log("the server is live");
});
