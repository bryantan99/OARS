var item = null;
var price = null;
var amount = null;
var itemCount = 0;
var itemMap = new Map();
var itemPriceMap = new Map();
window.addEventListener("load", function(){
	var itemButtons = document.getElementsByClassName("shop-item-button");
	for(var i = 0; i < itemButtons.length; i++){
		itemButtons[i].onclick = function(){
			var itemNameElement = this.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
			item = itemNameElement.firstElementChild.innerText;
			price = itemNameElement.nextElementSibling.nextElementSibling.firstElementChild.innerText;
			if(!itemMap.has(item)){
				itemMap.set(item, 1);
				itemPriceMap.set(item, price);
				addToCart();
			}else{
				var count = itemMap.get(item);
				itemMap.set(item, ++count);
				updateCart();
			}
			calculatePrice();
			window.alert("add successfully");
			itemCount++;
			document.getElementById("see-cart").innerText = "See the Cart(Item:"+itemCount+")";
		}
	}
	
	var see_cart = document.getElementById("see-cart");
	see_cart.onclick = function(){
		var cart_page = document.getElementById("cart-page");
		cart_page.style.display = "block";
	}
})

function addToCart(){
	var cart_item = "<span class='cart-item'>"+item+"</span>";
	var cart_price = "<span class='cart-price'>"+price+"</span>";
	var cart_quantity = "<span class='cart-quantity'>"+itemMap.get(item)+"</span>";

	var cartBox = document.createElement("div");
	cartBox.className = "cart-row";
	cartBox.innerHTML = cart_item+cart_price+cart_quantity;
	
	var cart = document.getElementById("cart");
	var cart_total = document.getElementById("cart-total");

	cart_total.parentNode.insertBefore(cartBox, cart_total);
	console.log(cart.innerHTML);
}

function updateCart(){
	var items = document.getElementsByClassName("cart-item");
	for(var i=0; i<items.length; i++){
		if(items[i].innerText == item){
			items[i].nextElementSibling.nextElementSibling.innerText = itemMap.get(item);
		}
	}
}

function calculatePrice(){
	var totalPrice = 0;
	itemMap.forEach(function(value, key){
		var price = Number(value) * Number(itemPriceMap.get(key).substring(2));
		totalPrice += price;
	})
	var cartPrice = document.getElementById("totalPrice");
	cartPrice.innerHTML = "RM "+totalPrice;
}

function closeEvent(){
	var cart_page = document.getElementById("cart-page");
	cart_page.style.display = "none";
	return false;
}


