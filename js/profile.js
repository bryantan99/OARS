var edit_btn = document.getElementById("edit-btn");
var tb = document.getElementById("home-table");
edit_btn.onclick = editOnClickEvent;

function editOnClickEvent(){
	var update_btn = document.getElementById("update-btn");
	var edit_btn = document.getElementById("edit-btn");
	update_btn.style.display = "none";
	edit_btn.innerText = "Confirm";
	edit_btn.style.fontSize = "14px";
	edit_btn.onclick = confirmOnClickEvent;
	
	var rows = tb.rows;
	for(var i = 0; i < rows.length; i++) {
		var defaultText = rows[i].lastElementChild.innerText;
		if(i == 0) {
			rows[i].lastElementChild.innerHTML = "<input class='input-width' style='width: 500px;' type='text' value='" + defaultText + "' autofocus = 'autofocus'></input>";
		} else if(i == 3) {
			rows[i].lastElementChild.innerHTML = "<div class='form-group'><select class='form-control' id='rc'><option>First Residential College</option><option>Second Residential College</option><option>Third Residential College</option><option>Fourth Residential College</option><option>Fifth Residential College</option><option>Sixth Residential College</option><option>Seventh Residential College</option><option>Eight Residential College</option><option>Ninth Residential College</option><option>Tenth Residential College</option><option>Eleventh Residential College</option><option>Twelfth Residential College</option><option>Outside Campus</option></select></div>";
		} else {
			rows[i].lastElementChild.innerHTML = "<input class='input-width' style='width: 500px;' type='text' value='" + defaultText + "'></input>";
		}
	}
}

function confirmOnClickEvent(){
	var update_btn = document.getElementById("update-btn");
	var edit_btn = document.getElementById("edit-btn");
	update_btn.style.display = "inline-block";
	edit_btn.innerText = "Edit";
	edit_btn.style.fontSize = "1em";
	edit_btn.onclick = editOnClickEvent;
	
	var rows = tb.rows;
	for(var i = 0; i < rows.length; i++) {
		if(i != 3){
			var editedText = rows[i].lastElementChild.firstElementChild.value;
			rows[i].lastElementChild.innerText = editedText;
		}else{
			var rc = document.getElementById("rc");
			rows[i].lastElementChild.innerText = rc[rc.selectedIndex].innerText;
		}
	}
}

