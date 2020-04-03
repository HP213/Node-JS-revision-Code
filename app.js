var express = require("express"),
mongoose = require("mongoose"),
bodyParser  = require("body-parser"),
app = express();
var utc = new Date();
// utc.setHours( utc.getHours() + 5);
// utc.setMinutes( utc.getMinutes() + 30);
// console.log(utc);
mongoose.connect("mongodb://localhost/testCovid");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


//Mongoose Model Config
var blogSchema = new mongoose.Schema({
  title : String,
  image : String,
  body : String,
  created : {type : Date, default : Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Restful Routes
// Blog.create({
//   title : "Test Blog",
//   image : "https://www.callicoder.com/assets/images/post/large/node-express-rest-api-tutorial.jpg",
//   body : "Heloooooooooooooooo"
// })
app.get('/', function(req, res){
  // res.send("Hii");
  res.redirect('/blogs');
})

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
      if(err){
        console.log("Error");
      }else{
        res.render("index", {blogs : blogs});
      }
    })
})

app.get("/blogs/new", function(req, res){
  res.render("new");
})


app.post("/blogs", function(req, res){
  // var s = req.body;
  var titleString =  req.body.Title ;
  var imageString = req.body.Image;
  var bodyString = req.body.Body;
  var blog = {title : titleString, image : imageString, body : bodyString};
  console.log(blog);
  // console.log(req.body.blog);
  Blog.create(blog, function(err, newBlog){
    if(err){
      res.render("new");
    }else{
      res.redirect("/blogs")
    }
  })
  // res.sendStatus(200);
})
const HTTP_PORT = process.env.HTTP_PORT || 3000;
// app.listen(HTTP_PORT, ()=>{
//   console.log(`Listening on PORT ${HTTP_PORT}`);
// });

app.listen(3000,'192.168.43.214' || 'localhost',function() {
    console.log('Application worker ' + process.pid + ' started...');
  }
  );
