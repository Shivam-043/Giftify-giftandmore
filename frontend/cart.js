const data=JSON.parse(localStorage.getItem("data"));
const shiping="1000";

set_value();
function set_value(){
    console.log(data);
    var quantity=parseInt(document.getElementsByTagName("tr")[1].childNodes[7].childNodes[0].value);
    var subtotal=parseInt(data.price)*quantity;
    document.getElementsByTagName("tr")[1].childNodes[5].innerHTML=data.name;
    document.getElementsByTagName("tr")[1].childNodes[9].innerHTML=data.price;
    document.getElementsByTagName("tr")[1].childNodes[11].innerHTML=subtotal;
    document.getElementsByTagName("tbody")[1].childNodes[0].childNodes[3].innerHTML=subtotal;
    document.getElementsByTagName("tbody")[1].childNodes[2].childNodes[3].innerHTML=shiping;
    document.getElementsByTagName("tbody")[1].childNodes[4].childNodes[3].innerHTML=parseInt(shiping)+subtotal;

}

function change(){
    var quantity=parseInt(document.getElementsByTagName("tr")[1].childNodes[7].childNodes[0].value);
    var price=parseInt(document.getElementsByTagName("tr")[1].childNodes[9].innerHTML);
    var subtotal=quantity*price;
    document.getElementsByTagName("tr")[1].childNodes[11].innerHTML=subtotal;
    document.getElementsByTagName("tbody")[1].childNodes[0].childNodes[3].innerHTML=subtotal;
    document.getElementsByTagName("tbody")[1].childNodes[4].childNodes[3].innerHTML=parseInt(shiping)+subtotal;
}

function checkout(){
    var price=document.getElementsByTagName("tbody")[1].childNodes[4].childNodes[3].innerHTML;
    localStorage.setItem("Total_price",price);
    window.location.href="costumer_detail/detail.html";
}