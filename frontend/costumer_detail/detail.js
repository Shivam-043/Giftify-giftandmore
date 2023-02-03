// const Server = "http://15.207.71.90:3001";
// const Server = "http://127.0.0.1:3001";
const Server = "http://15.207.71.90:3001";


// formAction();
function formaction() {
  var Server2 = Server + "/form";
  var data = JSON.parse(localStorage.getItem("data"));
  var product_id = localStorage.getItem("product_id");
  var Total_price = localStorage.getItem("Total_price");
  //   document.getElementsByTagName("input")[0].value = JSON.stringify(data.colors);
  //   document.getElementsByTagName("input")[1].value = JSON.stringify(data.addons);
  //   document.getElementsByTagName("input")[2].value = product_id;
  //   document.getElementsByTagName("input")[3].value = Total_price;
  var data = {
    colors: JSON.stringify(data.colors),
    addons: JSON.stringify(data.addons),
    check_types: JSON.stringify(data.check_types),
    occasion: JSON.stringify(data.occasion),
    occ_text: JSON.stringify(data.occ_text),
    text_screen: JSON.stringify(data.text_screen),
    special_product: JSON.stringify(data.special_product),
    product_id: product_id,
    total_price: Total_price,
    name: document.forms[0].name.value,
    email: document.forms[0].email.value,
    mobile_no: document.forms[0].mobile_no.value,
    address: document.forms[0].address.value,
    Name_on_Gift: document.forms[0].Name_on_Gift.value,
  };
  if (
    ValidateEmail(data.email) &&
    ValidateMobile_no(data.mobile_no) 
  ) {
    console.log("true otp");
    axios
      .post(Server2, data)
      .then((res) => {
        console.log(res.data);
        if (res.data == "success") {
          alert("order successful");
          window.location.href = "../index.html";
        } else {
          alert("some error occured \ntry again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(data);
}

function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   console.log(inputText);
  //   if (inputText.match(mailformat)) {
  if (mailformat.test(inputText)) {
    //   document.getElementById("email_input").focus();
    return true;
  } else {
    alert("You have entered an invalid email address!"); //The pop up alert for an invalid email address
    //   document.form1.text1.focus();

    return false;
  }
}

function ValidateMobile_no(inputText) {
  if (inputText.length == 10) {
    return true;
  } else {
    alert("mobile no should be 10 digit"); //The pop up alert for an invalid email address
    //   document.form1.text1.focus();

    return false;
  }
}

function ValidateOtp() {
  var Server2 = Server + "/otp";
  var data = JSON.parse(localStorage.getItem("data"));
  var product_id = localStorage.getItem("product_id");
  var Total_price = localStorage.getItem("Total_price");
  //   document.getElementsByTagName("input")[0].value = JSON.stringify(data.colors);
  //   document.getElementsByTagName("input")[1].value = JSON.stringify(data.addons);
  //   document.getElementsByTagName("input")[2].value = product_id;
  //   document.getElementsByTagName("input")[3].value = Total_price;
  var data = {
    colors: JSON.stringify(data.colors),
    addons: JSON.stringify(data.addons),
    check_types: JSON.stringify(data.check_types),
    occasion: JSON.stringify(data.occasion),
    occ_text: JSON.stringify(data.occ_text),
    text_screen: JSON.stringify(data.text_screen),
    special_product: JSON.stringify(data.special_product),
    product_id: product_id,
    total_price: Total_price,
    name: document.forms[0].name.value,
    email: document.forms[0].email.value,
    mobile_no: document.forms[0].mobile_no.value,
    address: document.forms[0].address.value,
    Name_on_Gift: document.forms[0].Name_on_Gift.value,
  };
  var data2 = {
    mob: data.mobile_no,
  };
  if (
    ValidateEmail(data.email) &&
    ValidateMobile_no(data.mobile_no) 
  ) {
    axios
      .post(Server2, data2)
      .then((res) => {
        // console.log(res.data);

        var userOtp = prompt("Enter OTP");
        if (userOtp == res.data) {
          alert("correct otp");
          formaction();
        } else {
          alert("wrong OTP");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
