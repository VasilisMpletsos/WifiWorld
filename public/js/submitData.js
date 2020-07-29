$('#add').submit( e => {
  e.preventDefault();
  // Get the data from the form.
  var mac = document.getElementById('mac').value;
  var essid = document.getElementById('essid').value;
  var password = document.getElementById('password').value;
  var location = document.getElementById('location').value;
  var jsonData = {mac,essid,password,location};
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/add',
    data: JSON.stringify(jsonData),
    success: () => {
      suc();
    },
    error: ()=>{
       fail();
    }
  })
});

function suc(){
  var form = document.getElementById('add');
  form.style.backgroundColor = '#7dc145b8';
  setTimeout(()=>{
    form.style.backgroundColor = 'transparent';
  },3000)
}

function fail(){
  var form = document.getElementById('add');
  form.style.backgroundColor = '#bf1616c2';
  setTimeout(()=>{
    form.style.backgroundColor = 'transparent';
  },3000)
}
