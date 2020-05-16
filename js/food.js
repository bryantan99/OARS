var startPoint = null;
var endPoint = null;
window.addEventListener("scroll", function(){
	
	if(startPoint == null){
		startPoint = document.documentElement.scrollTop;
	}
	
	endPoint = document.documentElement.scrollTop;
	console.log(startPoint, endPoint);
	
	var menu_title = document.getElementById("menu-title");
	if(endPoint <= 200){
		menu_title.style.color = "white";
	}else{
		menu_title.style.color = "black";
	}
})