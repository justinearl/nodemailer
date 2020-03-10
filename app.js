const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "justinearlguevarra@gmail.com",
    pass: "nt89?<ds>x567ght"
  }
});

app.post("/", async (req, res) => {
  const body = req.body;
  const email = body.email;
  const subject = body.subject;
  const message = body.message;

  try {
    await transporter.sendMail(
      {
        from: "Earl Guevarra <justinearlguevarra@gmail.com>",
        to: email,
        subject: subject,
        text: message
      },
      () => {
        res.redirect("/?success");
      }
    );
  } catch (error) {
    console.log(error);
    res.redirect("/?error");
  }
  res.send("Ok");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
