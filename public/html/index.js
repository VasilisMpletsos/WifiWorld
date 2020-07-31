module.exports = ({info})=>{
      return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Wifi Plaza</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script src='https://kit.fontawesome.com/a076d05399.js'></script>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        <link rel='icon' href='../images/favicon.png' type='image/png'/>
      </head>

      <body>
       <!-- Nav Section -->
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">WIFI PLAZA</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/VasilisMpletsos/Wifi_Plaza" target="_blank">Github</a>
          </li>
        </ul>
      </nav>


       <!-- Body Section -->
      <div class="main">
        <div class="row">
          <div class="notes">
            This site is aiming in creating a global database for the aspiring hackers.
            If you have cracked a wifi password or searching for one, then this is the website your are looking for.
            The only thing you will have to do is add the data of the wifi you have cracked to the one form, or if you
            are looking for the password just type the <u><bold>MAC address</bold></u> or the <u><bold>ESSID</bold></u>
            and all the avaiable matching data from the database will show up!
            </div>
          </div>

          ${info}

        <div class="row">
          <div class="col boxes">
            <div class="form">
              <h1 class="title">Add Or Update Cracked Wifi</h1>
              <form action="/add" method="POST" enctype="multipart/form-data">
                <label for="mac">[Required] MAC Address:</label><br>
                <input type="text" name="mac" autocomplete="on" placeholder="e.g 00-FF-A7-67-39-6C" required><br>
                <label for="essid">[Required] Name:</label><br>
                <input type="text" name="essid" autocomplete="on" placeholder="e.g Wifi128" required><br>
                <label for="password">Plain Password:</label><br>
                <input type="text" name="password" autocomplete="on" placeholder="e.g password1234"><br>
                <label for="location">Location:</label><br>
                <input type="text" name="location" autocomplete="on" placeholder="e.g Greece/Thessaloniki"><br>
                <label for="fileToUpload">Capture File:</label><br>
                <input type="file" name="file">
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div class="col boxes">
            <div class="form">
              <h1 class="title">Search Wifi</h1>
              <form action="#" id="search">
                <label for="mac">MAC Address:</label><br>
                <input type="text" id="macGet" placeholder="e.g 09-0F-A7-17-90-CF"><br>
                <label for="essidGet">Name:</label><br>
                <input type="text" id="essidGet" placeholder="e.g WifiPlaza">
                <button type="submit" value="Submit">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="container">
            <div id="form2">
            </div>
          </div>
        </div>

      </div>

       <!-- Script Section -->
      <script src="../js/getData.js"></script>
      </body>
      </html>
      `
    }
