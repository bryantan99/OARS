var selectedRowIndex;

function filter() {
  // Declare variables
  var input, keyword, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  keyword = input.value.toUpperCase();
  table = document.getElementById("reportTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.innerText;
      if (txtValue.toUpperCase().indexOf(keyword) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function openCreateComplaint() {
  document.getElementById("new-complaint-Title").innerHTML = "New Complaint";
  document.getElementById("complaintForm").reset();
  var x = document.getElementById("new-complaint");
  var y = document.getElementById("overlay");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.opacity = 1;
  } 
}

function closeCreateComplaint() {
  var x = document.getElementById("new-complaint");
  var y = document.getElementById("overlay");
  x.style.display = "none";
  y.style.opacity = 0;
  document.getElementById("complaintForm").reset();
}

function addRow() {
  var table = document.getElementById("reportTable");
  var row = table.insertRow(table.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  // Report ID
  reportID = table.rows.length-1;

  // Report Timestamp
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();
  monthArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var sessionArray = ["AM","PM"];
  var session = 0;

  if (hour>=12 && hour <=23)  
  {
    if (hour>13){
      hour=hour-12;
    }
    session = 1;
  } else if (hour ==0 ){
    hour = 12;
    session = 0;
  }

  if (min <10) {
    min = "0" + min;
  }
  var dateString = day + " " + monthArray[month] + " " + year + " " + hour + ":" + min + " " + sessionArray[session];

  cell1.innerHTML = "R"+ reportID.toString();
  cell2.innerHTML = document.getElementById("description").value;
  cell3.innerHTML = "Pending";
  cell4.innerHTML = dateString;
  cell5.innerHTML = "<button class=\"btn btn-primary\" type=\"button\" onclick=\"openEditWindow();\">Edit</button>";
  cell6.innerHTML = "<button class=\"btn btn-primary\" type=\"button\" onclick=\"deleteRow(this);\">Delete</button>";
  
  // Close Create Complaint Window
  var x = document.getElementById("new-complaint");
  var y = document.getElementById("overlay");
  x.style.display = "none";
  y.style.opacity = 0;

  document.getElementById("complaintForm").reset();
  var a = document.getElementById("pendingCaseNo");
  var integer = parseInt(a.innerText,10);
  a.innerText = integer+1;
  return false;
}

function openEditWindow() {
  var x = document.getElementById("new-complaint");
  var y = document.getElementById("overlay");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.opacity = 1;
  }
  var submitButton = document.getElementById("submitButton");
  submitButton.style.display = "none";
  var saveButton = document.getElementById("saveButton");
  saveButton.style.display = "block";

  var table = document.getElementById("reportTable"),rIndex;
  for (var i=0;i<table.rows.length;i++){
    table.rows[i].onclick = function() {
      rIndex = this.rowIndex;
      selectedRowIndex = rIndex;
      document.getElementById("new-complaint-Title").innerHTML = this.cells[0].innerHTML;
      document.getElementById("description").value = this.cells[1].innerHTML;
      document.getElementById("contact").value = "0112223333";
    }
  }
}

function updateRow(){
  var x = document.getElementById("reportTable").rows[selectedRowIndex].cells;
  x[1].innerHTML = document.getElementById("description").value;

  var x = document.getElementById("new-complaint");
  var y = document.getElementById("overlay");
  x.style.display = "none";
  y.style.opacity = 0;

  document.getElementById("complaintForm").reset();

  var submitButton = document.getElementById("submitButton");
  submitButton.style.display = "block";
  var saveButton = document.getElementById("saveButton");
  saveButton.style.display = "none";
}

function deleteRow(r) {
  if (confirm('Are you sure you want to delete?')) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("reportTable").deleteRow(i);
    var a = document.getElementById("pendingCaseNo");
    var integer = parseInt(a.innerText,10);
    a.innerText = integer-1;
  }
}

function exportTableToExcel(tableID, filename = "") {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

  // Specify file name
  filename = filename ? filename + ".xls" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}

function display() {
  window.print();
}
