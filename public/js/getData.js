$('#search').submit(e => {
  e.preventDefault();

  // Get the data from the form.
  var mac = document.getElementById('macGet').value;
  var bssid = document.getElementById('bssidGet').value;
  if(mac && bssid){
    var jsonData = {mac,bssid};
  }else if(bssid){
    var jsonData = {bssid};
  }else if(mac){
    var jsonData = {mac};
  }else{
    return;
  }
   $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/search',
    data: JSON.stringify(jsonData),
    success: (data) => {
      gotSuccess();
      showResults(data);
    },
    error: ()=>{
      failure();
    }
  });
});

function gotSuccess(){
  var form = document.getElementById('search');
  form.style.backgroundColor = '#7dc145b8';
  setTimeout(()=>{
    form.style.backgroundColor = 'transparent';
  },3000)
}

function showResults(data){
  var result = document.getElementById('form2');
  result.innerHTML = '';
  var rowHead = document.createElement('h1');
  rowHead.innerText = `Results`;
  result.appendChild(rowHead);
  var table = document.createElement('table');
  table.setAttribute('class','table');
  let firstrow = document.createElement('tr');
  let header1 = document.createElement('th');
  header1.innerText = 'Password';
  let header2 = document.createElement('th');
  header2.innerText = 'Location';
  firstrow.appendChild(header1);
  firstrow.appendChild(header2);
  table.appendChild(firstrow);
  for (i in data){
    let row = document.createElement('tr');
    let password = document.createElement('td');
    password.innerText = data[i].password;
    let loc = document.createElement('td');
    loc.innerText = data[i].location;
    row.appendChild(password);
    row.appendChild(loc);
    table.appendChild(row);
  }
  result.appendChild(table);
}

function failure(){
  var form = document.getElementById('search');
  form.style.backgroundColor = '#bf1616c2';
  setTimeout(()=>{
    form.style.backgroundColor = 'transparent';
  },3000)
}
