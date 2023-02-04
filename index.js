const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const path = require("path");


const dotenv = require("dotenv").config();
const accountSid = "AC54239e5f869206a9d7b76ac6f27dd9e5";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);
// app.use(http());

const db = mysql.createConnection({
  user: "root",
  host: "giftify.cs0gg5mbtn2b.ap-south-1.rds.amazonaws.com",
  password: "Shivam114",
  database: "giftyfy",
  multipleStatements: true,
});

app.use("/", express.static(path.join(__dirname, "/frontend")))

app.post("/getProduct", (req, res) => {
  db.query("select * from product_detail ;", (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(102).send(new Error(err.sqlMessage));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// app.post("/validate_otp", (req, res) => {
//   var phone_no = req.body.mobile_no

//   });

let mobile_no;

app.post("/form", function (req, res) {
  console.log(req.body);
  var Email = req.body.email;
  var name = req.body.name;
  var colors = req.body.colors;
  var addons = req.body.addons;
  var product_id = req.body.product_id;
  var total_price = req.body.total_price;
  mobile_no = req.body.mobile_no;
  var address = req.body.address;
  var Name_on_Gift = req.body.Name_on_Gift;
  var types = req.body.types;
  var special_product = req.body.special_product;
  var success = false;
  var check_types = req.body.check_types;
  var occasion = req.body.occasion;
  var occ_text = req.body.occ_text;
  var text_screen = req.body.text_screen;
  console.log(mobile_no);

  db.query(
    "select email from user_detail where email= ? ;",
    [Email],
    (err, result) => {
      if (err) {
        console.log("ERROR : ");
        console.log(err.sqlMessage);
        res.status(102).send(new Error(err.sqlMessage));
      } else {
        if (result[0] != null) {
          console.log("old user");
          db.query(
            `update user_detail set name=?,mobile=?,address=? where email=?;
          insert into order_detail (product_id,email,colors,addons,Total_price,
            special_product,name_on_gift,check_types,occ_text,occasion,text_screen) values (?,?,?,?,?,?,?,?,?,?,?);`,
            [
              name,
              mobile_no,
              address,
              Email,
              product_id,
              Email,
              colors,
              addons,
              total_price,
              special_product,
              Name_on_Gift,
              check_types,
              occ_text,
              occasion,
              text_screen,
            ],
            (err, result) => {
              if (err) {
                console.log(err.sqlMessage);
                res.status(102).send(new Error(err.sqlMessage));
              } else {
                console.log("success");
                // res.redirect("http://127.0.0.1:5500/frontend/index.html");
                success = true;
                res.send("success");
              }
            }
          );
        } else {
          console.log("new user");
          db.query(
            `insert into user_detail (name,email,mobile,address) values (?,?,?,?);
          insert into order_detail (product_id,email,colors,addons,Total_price,
            special_product,name_on_gift,check_types,occ_text,occasion,text_screen) values (?,?,?,?,?,?,?,?,?,?,?)`,
            [
              name,
              Email,
              mobile_no,
              address,
              product_id,
              Email,
              colors,
              addons,
              total_price,
              special_product,
              Name_on_Gift,
              check_types,
              occ_text,
              occasion,
              text_screen,
            ],
            (err, result) => {
              if (err) {
                console.log(err.sqlMessage);
                res.status(102).send(new Error(err.sqlMessage));
              } else {
                console.log("sucess");
                success = true;
                res.send("success");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/getProductDetail", (req, res) => {
  var product_id = req.body.Product_id;
  console.log(req.body);
  db.query(
    "select * from product_detail where product_id= ? ;",
    [product_id],
    (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(102).send(new Error(err.sqlMessage));
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/otp", (req, res) => {
  var mobile_no = req.body.mob;
  console.log(mobile_no);

  var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  client.messages
    .create({
      body: `Please Enter this code : ${seq}`,
      from: "+15058713894",
      to: "+91"+ mobile_no,
    })
    .then((message) => {
      console.log(message.sid);
      console.log(seq);
      res.send(seq);
      // res.send(seq);
    } )
    .catch((error) => {
      console.log(error);
      res.status(102).send(new Error(error));
    });

    // client.verify.v2
    // .services(verifySid)
    // .verifications.create({ to: "+91" + mobile_no, channel: "sms" })
    // .then((verification) => console.log(verification.status))
    // .then(() => {
    //   console.log(seq);
    //   res.send(seq);
    //   const readline = require("readline").createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //   });
    //   readline.question("Please enter the OTP:", (otpCode) => {
    //     client.verify.v2
    //       .services(verifySid)
    //       .verificationChecks.create({ to: "+91" + mobile_no, code: otpCode })
    //       .then((verification_check) => console.log(verification_check.status))
    //       .then(() => readline.close());
    //   });
    // });

});

// client.newKeys.create({friendlyName: 'Shivam'})
//               .then(new_key => console.log(new_key.sid));

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919520443591", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919520443591", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

//Asynchronous Function.

// function update_tale(req ,res){
//   var Email=req.body.email;
//   var name=req.body.name;
//   var colors=req.body.colors;
//   var addons=req.body.addons;
//   var product_id=req.body.product_id;
//   var total_price=req.body.total_price;
//   var mobile_no=req.body.mobile_no;
//   var address=req.body.address;
//   var Name_on_Gift=req.body.Name_on_Gift;

// }
const SERVICE_PLAN_ID = '51100a75b1744695a9fc457b6dc53d6a';
const API_TOKEN = '48fb5cfa27464d77a73a7cd31c8ae6ab';
const SINCH_NUMBER = '+447520652018';
const TO_NUMBER = '+919520443591';

const fetch = require("node-fetch");

async function run() {
  const resp = await fetch(
    'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      },
      body: JSON.stringify({
        from: SINCH_NUMBER,
        to: [TO_NUMBER],
        body: 'Programmers are tools for converting caffeine into code. We just got a new shipment of mugs! Check them out: https://tinyurl.com/4a6fxce7!'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();


app.listen(80, () => {
  console.log("started successfully");
});
