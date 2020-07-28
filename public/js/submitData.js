$('#add').submit( e => {
  e.preventDefault();
  // Get the data from the form.
  var mac = document.getElementById('mac').value;
  var essid = document.getElementById('essid').value;
  var password = document.getElementById('password').value;
  var {loc,flag} = $.ajax({
    type: "GET",
    url: '/geolocation',
    success: (data)=>{
      var flag = data.flag;
      var location = data.continent+'/'+data.country+'/'+data.region;
      var jsonData = {mac,essid,password,location,flag};
      console.log(jsonData);
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
    },error: ()=>{
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
