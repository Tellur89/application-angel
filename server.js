const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const nodemailerSmtp = require("nodemailer-smtp-transport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { Prohairesis } = require("prohairesis");
const mySQL = require("mysql");

const app = express();
const PORT = process.env.PORT || 5000;

const mySQLstring =
  "mysql://bb464e1b22a122:72effd9a@us-cdbr-east-04.cleardb.com/heroku_b1ccab04a97ae4f?reconnect=true";
const database = new Prohairesis(mySQLstring);

// Middleware
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
  await database.execute(
    `
      INSERT INTO angel (
        pub,
        position,
        Full_name,
        email_add,
        phone_no,
        driving,
        location,
        experience,
        about,
        checkContact,
        date_added
      
      ) VALUES (
        @pubName,
        @position,
        @fullname,
        @email,
        @phone,
        @driving,
        @loc,
        @experience,
        @about,
        @checkContact,
        NOW()
      )
  `,
    {
      pubName: req.body.pubName,
      position: req.body.position,
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      driving: req.body.driving,
      loc: req.body.loc,
      experience: req.body.experience,
      about: req.body.about,
      checkContact: req.body.checkContact,
    }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "websit3application@gmail.com",
      pass: "Robinson1",
    },
  });


  const mailOptions = {
    from: "websit3application@gmail.com",
    to: "websit3application@gmail.com, marjoramleisure-hr@hotmail.co.uk, angelandharp@hotmail.co.uk",
    subject: `JOB APPLICATION: ${req.body.pubName}, ${req.body.position}`,
    text: `\n \n NAME: \n ${req.body.fullname},\n
    PHONE NUMBER: \n ${req.body.phone},\n 
    EMAIL ADDRESS: \n ${req.body.email},\n 
    LOCATION: \n ${req.body.loc},\n 
    DRIVING: \n ${req.body.driving},\n 
    WORK EXPERIENCE: \n ${req.body.experience},\n
    ABOUT: \n ${req.body.about}, \n
    CONTACT: \n ${req.body.checkContact}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
    transporter.close();
  });
  console.log(req.body);
  // res.end("Application added");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});


