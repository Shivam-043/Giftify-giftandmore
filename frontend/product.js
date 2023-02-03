// const Server = "http://127.0.0.1:3001";

product_view();

function product_view() {
  var product = document.getElementsByClassName("products-container")[0];
  var Server2 = Server + "/getProduct";

  axios
    .post(Server2, "hello")
    .then((res) => {
        console.log(res.data);
        var result=res.data;
        

      for (var i = 0; i < 3; i++) {
        // var brand= result[i].brand;
        // var name= result[i].name;
        product.innerHTML += `<div class="pro" value="`+result[i].product_id+`" onclick="product_info_redirect('`+i+`')">
        <img src="assets/img/istockphoto-491520707-612x612.jpg" class="product_img">
        <img src="assets/img/sample-stamp-rubber-style-red-260nw-1811246308.webp" class="hover_image">
        <div class="des">
          <span style="font-family: 'Dosis', sans-serif;">`+result[i].brand+`</span>
          <h5 style="font-family: 'Dosis', sans-serif;">`+result[i].name+`</h5>
          <h4 style="font-family: 'Dosis', sans-serif;">`+result[i].price+` Rs.</h4>
      </div>
        <a href="#"><span class="cart"><i id="cart" class="fa-solid fa-cart-shopping"></i></span></a>
    </div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function product_info_redirect(a){
    var product_id=document.getElementsByClassName("pro")[a].getAttribute("value");
    console.log(product_id);
    localStorage.setItem("product_id",product_id);
    window.location.href="Product-detail/product_detail.html";
}
