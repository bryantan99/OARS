function renderTime() {
	var timestamp = new Date();
	var session = 0;
	var user = "Tan Jia Qin";
	var greetingString;
	var year = timestamp.getFullYear();
	var month = timestamp.getMonth();
	var dayOfMonth = timestamp.getDate();
	var day = timestamp.getDay();
	var hour = timestamp.getHours();

	if (hour>=5 && hour <12) {
		greetingString = "Good morning, " + user + ". ";
		session = 0;
	}

	else if (hour >=12 && hour <17) {
		greetingString = "Good afternoon, " + user + ". ";
		session = 1;
		if (hour > 12 ) {
			hour=hour-12;
		}
	} 

	else {
		greetingString = "Good evening, " + user + ". ";
		if (hour >=17 && hour <=23) {
			session = 1;
			hour = hour - 12;
		} 
		else if (hour==0) {
			hour=12;
			session = 0;
		}
		else {
			session=0;
		}
	}

	var min = timestamp.getMinutes();
	if(min < 10) {
		min = "0" + min;
	}
	var sec = timestamp.getSeconds();

	sessionArray = ["AM", "PM"];
	dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	document.getElementById("clockDisplay").innerHTML = hour + ":" + min + " " + sessionArray[session];
	document.getElementById("greeting").innerHTML = greetingString;

	setTimeout(renderTime, 1000);
}

function pronounciation() {
	var audio = new Audio("https://lex-audio.useremarkable.com/mp3/oar_us_1.mp3");
	audio.volume = 0.2;
	audio.play();
}