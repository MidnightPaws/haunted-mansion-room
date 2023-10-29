var express = require('express');
var cookieParser = require('cookie-parser');

const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Landing page
app.get('/', async function(req, res) {
    if (req.cookies.mistakes === undefined) {
      console.log("ASDSA");
        // Cookie doesn't exist, create it
        await res.cookie('mistakes', 0);
      await res.cookie('red', 1);
      await res.cookie('blue', 0);
      await res.cookie('yellow', 0);
      await res.cookie('finalie', 0);
      await res.sendFile(path.join(__dirname, 'public', 'TESTING/index.html'));
    } else {
        // Cookie exists
        res.sendFile(path.join(__dirname, 'public', 'TESTING/index.html'));
    }
});

app.get('/user_start_over', function(req, res){
   res.clearCookie('mistakes');
   res.send('mistakes cleared!');
});

app.get('/check_cookies',function(req, res){ 
  res.send(req.cookies);
});

app.get('/user_did_mistake', function(req, res) {
  // Increment mistakes by 1
  const updatedMistakes = parseInt(req.cookies.mistakes || 0) + 1;

  // Set the updated value in the cookie
  res.cookie('mistakes', updatedMistakes);

  res.send("You just made a mistake!");
});

app.get('/check_if_user_collected_all', function(req, res) {
  // Increment mistakes by 1
  if (red){
    if (blue){
      if(yellow){
        if(finalie){
          res.cookie('collectedAll',true);
      }
    }
  }
    res.cookie('collectedAll',false);
}});

app.listen(3000);
