const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
const close_color = document.getElementById("close_color");
const color = document.getElementById("color");
const color_option = document.getElementById("product-choose-color");
const product_addon = document.getElementById("product-addon");
const addon = document.getElementById("addon");
const type_btn = document.getElementById("ctype");
const choose_type = document.getElementById("choose_type");
const close_addon = document.getElementById("close_addon");
// const required = document.getElementById("required");
// const requiredButton = document.getElementById("required_btn");
const stypes = document.getElementById("sproduct");
const special_products = document.getElementById("special_product");
const close_products = document.getElementById("close_products");
var brand;

// const Server = "http://15.207.71.90:3001";
// const Server = "http://127.0.0.1:3001";
const Server = "http://15.207.71.90:3001";


localStorage.removeItem("addons");
localStorage.removeItem("colors");
// var cart_value;
var addon_value;

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

if (close_color) {
  close_color.addEventListener("click", () => {
    color_option.style.display = "none";
  });
}

if (choose_type) {
  choose_type.addEventListener("click", () => {
    choose_type.style.display = "none";
  });
}

// if (close_required) {
//     close_required.addEventListener("click", () => {
//       required.style.display = "none";
//     });
//   }

if (close_addon) {
  close_addon.addEventListener("click", () => {
    product_addon.style.display = "none";
  });
}

if (close_products) {
  close_products.addEventListener("click", () => {
    special_products.style.display = "none";
  });
}

function addon1() {
  color_option.style.display = "block";
  color_option.style.transition = "0.3s ease";
}

function addon2() {
  product_addon.style.display = "block";
  var cart_value = parseInt(
    document.getElementsByClassName("price")[0].innerHTML
  );
  document.getElementById("cart_value").innerHTML = cart_value;
  console.log(cart_value);
  document.getElementById("rupee").innerHTML = cart_value;
}

function addon3() {
  choose_type.style.display = "block";
}
// function addon4() {
//   required.style.display = "block";
// }

function addon5() {
  special_products.style.display = "block";
}

function add_value(temp) {
  let checkbox = document.getElementsByClassName("checkbox")[temp];
  if (checkbox.checked) {
    var cart_value = parseInt(document.getElementById("rupee").innerHTML);
    addon_value = parseInt(
      document.getElementsByClassName("addon_value")[temp].innerHTML
    );
    var total = cart_value + addon_value;
    document.getElementById("rupee").innerHTML = total;
    var addons = JSON.parse(localStorage.getItem("addons"));
    console.log(addons);
    if (addons == null) {
      localStorage.setItem("addons", JSON.stringify([checkbox.name]));
    } else {
      addons.push(checkbox.name);
      localStorage.setItem("addons", JSON.stringify(addons));
    }
  } else {
    var cart_value = parseInt(document.getElementById("rupee").innerHTML);
    addon_value = parseInt(
      document.getElementsByClassName("addon_value")[temp].innerHTML
    );
    total = cart_value - addon_value;
    document.getElementById("rupee").innerHTML = total;
    var addons = JSON.parse(localStorage.getItem("addons"));
    var i = checkEqual(addons, checkbox.name);
    addons.splice(i, 1);
    localStorage.setItem("addons", JSON.stringify(addons));
  }
}

function checkEqual(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == value) {
      console.log(i);
      return i;
    }
  }
}

function change_style(temp) {
  var c = document.getElementsByClassName("product-color-number")[temp];
  var flag = c.getAttribute("value");

  var color_name =
    document.getElementsByClassName("color_name")[temp].innerHTML;
  if (flag == 0) {
    var c = document.getElementsByClassName("product-color-number")[temp];
    c.style.border = "1px solid green";
    c.setAttribute("value", "1");

    var colors = JSON.parse(localStorage.getItem("colors"));
    console.log(colors);
    if (colors == null) {
      localStorage.setItem("colors", JSON.stringify([color_name]));
    } else {
      colors.push(color_name);
      localStorage.setItem("colors", JSON.stringify(colors));
    }
  } else {
    c.style.border = "none";
    c.setAttribute("value", "0");
    var colors = JSON.parse(localStorage.getItem("colors"));
    var i = checkEqual(colors, color_name);
    colors.splice(i, 1);
    localStorage.setItem("colors", JSON.stringify(colors));
  }
}

function addTo_cart() {

  // if(document.getElementById("myRadio").required)
  var check_types = "";
  var occasion = "";
  var special_product = "";
  if (brand == "Big_Gift" || brand == "Small_Gift") {
    var radio = document.getElementsByName("type");
    var radio2 = document.getElementsByName("occasion");

    if (radio[0].checked) {
      check_types = radio[0].value;
    } else if (radio[1].checked) {
      check_types = radio[1].value;
    }
    if (radio2[0].checked) {
      occasion = radio2[0].value;
    } else if (radio2[1].checked) {
      occasion = radio2[1].value;
    }
  }
  if (brand == "Big_Gift") {
    var radio3 = document.getElementsByName("product");
    if (radio3[0].checked) {
      special_product = radio3[0].value;
    } else if (radio3[1].checked) {
      special_product = radio3[1].value;
    } else if (radio3[2].checked) {
      special_product = radio3[2].value;
    }
  }
  data = {
    name: document.getElementById("product_name").innerHTML,
    price: document.getElementById("rupee").innerHTML,
    addons: localStorage.getItem("addons"),
    colors: localStorage.getItem("colors"),
    check_types: check_types,
    occasion: occasion,
    special_product: special_product,
    occ_text: document.getElementById("occ_name").value,
    text_screen: document.getElementById("text_sc").value,
  };

  localStorage.removeItem("colors", "addons");
  // localStorage.removeItem("");
  localStorage.setItem("data", JSON.stringify(data));
  window.location.href = "../cart.html";
}
set_value();

function set_value() {
  var product_i = localStorage.getItem("product_id");
  var Server2 = Server + "/getProductDetail";
  var data = {
    Product_id: product_i,
  };

  axios
    .post(Server2, data)
    .then((res) => {
      console.log(res.data);
      var result = res.data[0];
      if (res.data[0].brand == "Small_Gift") {
        brand = "Small_Gift";
        var buttons = document.getElementsByClassName("cart_item")[0];
        buttons.innerHTML += `    <section id="choose_type">
        <div class="color-screen" style="height: 10vh;">
          <div class="header1">
            <h3>Choose Types</h3>
          </div>
          <hr />
          <div class="type" id="radio_type">
            <div class="align">
              <input type="radio" name="type" value="Bracellet"><span> Bracellet </span></input>
            </div>
            <div class="align">
              <input type="radio" name="type" value="Jewels"> <span>Jewels</span></input>
            </div>
          </div>
        </div>
      </section>
      <div class="amount" onclick="addTo_cart()" method="post" action="/">
          <span class="total" style="font-weight: 600;">Total <span id="rupee" name="rupee"></span></span>
          <span class="items" style="float: right; text-transform: uppercase;">Add Item</span>
        </div>`;
      } else if (res.data[0].brand == "Big_Gift") {
        brand = "Big_Gift";
        var buttons = document.getElementsByClassName("cart_item")[0];
        buttons.innerHTML += `<div id="big_content"><section id="choose_type">
        <div class="color-screen" style="height: 20vh;">
          <div class="header1">
            <h3>Choose Types</h3>
          </div>
          <hr />
          <div class="type" id="radio_type">
            <div class="align">
              <input type="radio" name="type" value="Bracellet"><span>Bracellet</span></input>
            </div>
            <div class="align">
              <input type="radio" name="type" value="Jewels"><span> Jewels</span></input>
            </div>
            
          </div>
        </div>
      </section>
      <section id="special_product">
      <div class="special_products" style="height: 20vh;">
        <div class="header1">
          <h3>Choose Special Products</h3>
        </div>
        <hr />
        <div class="products" id="radio_type">
          <div class="align">
            <input type="radio" name="product" value="Doodle Art"><span> Doodle Art</span></input>
          </div>
          <div class="align">
            <input type="radio" name="product" value="Mug"><span> Mug</span></input>
          </div>
          <div class="align" style="">
            <input type="radio" name="product" value="Photo Frame"><span> Photo Frame</span></input>
          </div>
        </div>
      </div>
    </section> </div>
    <div class="amount" onclick="addTo_cart()" method="post" action="/">
          <span class="total" style="font-weight: 600;">Total <span id="rupee" name="rupee"></span></span>
          <span class="items" style="float: right; text-transform: uppercase;">Add Item</span>
        </div>`;
      }
      document.getElementById("product_name").innerHTML = result.name;
      document.getElementById("brand_name").innerHTML = result.brand;
      for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("strike-through")[i].innerHTML =
          parseInt(result.price) + 50;
      }
      for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("price")[i].innerHTML = result.price;
      }
      document.getElementById("cart_value_before").innerHTML = result.price;
      document.getElementById("strike").innerHTML = parseInt(result.price) + 50;
      // document.getElementById("cart_value").innerHTML = result.price;
      // document.getElementById("rupee").innerHTML = result.price;
      localStorage.setItem("product");
    })
    .catch((err) => {
      console.log(err);
    });
}
