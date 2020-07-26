$('#add').submit(e => {
  e.preventDefault();
  console.log('I am here!');
  // Get the data from the form.
  var mac = document.getElementById('mac').value;
  var bssid = document.getElementById('bssid').value;
  var hash = document.getElementById('hash').value;
  var password = document.getElementById('password').value;
  var location = document.getElementById('location').value;
  var jsonData = {mac,bssid,hash,password,location};
  mac = "12345";
   $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/add',
    data: JSON.stringify(jsonData),
    success: () => {
      var form = document.getElementById('add');
      form.style.backgroundColor = '#7dc145b8';
      setTimeout(()=>{
        form.style.backgroundColor = 'transparent';
      },3000)
    },
    error: ()=>{
      var form = document.getElementById('add');
      form.style.backgroundColor = '#bf1616c2';
      setTimeout(()=>{
        form.style.backgroundColor = 'transparent';
      },3000)
    }

  });
});
