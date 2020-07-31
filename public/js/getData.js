$('#search').submit(e => {
  e.preventDefault();

  // Get the data from the form.
  var mac = document.getElementById('macGet').value;
  var essid = document.getElementById('essidGet').value;
  if(mac & essid){
    var jsonData = {mac,bssid};
  }else if(essid){
    var jsonData = {essid};
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
  let headerPass = document.createElement('th');
  headerPass.innerText = 'Password';
  let headerLoc = document.createElement('th');
  headerLoc.innerText = 'Location';
  let headerMAC = document.createElement('th');
  headerMAC.innerText = 'MAC';
  let headerName = document.createElement('th');
  headerName.innerText = 'ESSID';
  let download = document.createElement('th');
  download.innerText = 'Capture';
  let closeButton = document.createElement('th');
  closeButton.innerText = 'Remove';
  firstrow.appendChild(headerMAC);
  firstrow.appendChild(headerName);
  firstrow.appendChild(headerPass);
  firstrow.appendChild(headerLoc);
  firstrow.appendChild(download);
  firstrow.appendChild(closeButton);
  table.appendChild(firstrow);
  for (i in data){
    let row = document.createElement('tr');
    let password = document.createElement('td');
    password.innerText = data[i].password;
    let loc = document.createElement('td');
    loc.innerText = data[i].location;
    let mac = document.createElement('td');
    mac.innerText = data[i].mac;
    let name = document.createElement('td');
    name.innerText = data[i].essid;
    let link = document.createElement('td');
    if(data[i].capture){
        link.innerHTML = `<a href="/hash/${data[i].capture}"><i style="font-size:20px" class="fas fa-download"></i></span></a>`;
    }else{
        link.innerHTML = '<i style="font-size:20px" class="fas fa-ban"></i>';
    }
    let close = document.createElement('td');
    close.innerHTML = '<a href="#form2"><i style="font-size:16px" class="fas fa-times"></i></a>';
    close.addEventListener('click',()=>{
      row.remove();
    })
    row.appendChild(mac);
    row.appendChild(name);
    row.appendChild(password);
    row.appendChild(loc);
    row.appendChild(link);
    row.appendChild(close);
    table.appendChild(row);
  }
  result.appendChild(table);
  window.scrollTo(0,document.body.scrollHeight);
}

function failure(){
  var form = document.getElementById('search');
  form.style.backgroundColor = '#bf1616c2';
  setTimeout(()=>{
    form.style.backgroundColor = 'transparent';
  },3000)
}
