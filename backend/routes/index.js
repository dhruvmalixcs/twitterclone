var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {checkLogin} = require("../service/userService");
// down 2  lines done in lecture 3;
const db=require('../models');
db.employee.sync();
/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
   // Render the index.ejs template
   res.render('index', { title: 'Express'});
});

// router.post("/home",async function (req,res,next){
//   //check the login id and passowrd
//   let username = req.body.username;
//   let password = req.body.password;
//   // let user = await db.users.findOne({where : {username :username}});
//   let userlogined = await checkLogin(username,password);
//   let user = await db.users.findOne({where :{username:username}});
//   if(userlogined!=null){
//     req.session.username=username;
//   }
//   else{
//     // res.redirect("/message")
//     res.render("index" , {message :"invalid credentials"});
//   }
//   //if correct render home.ejs
//   res.render("home",{title: "Express"});
//   //else if failed login, render ejs with message

// })

// var express = require('express');
// var router = express.Router();
// const db = require("../models");
// const { checkLogin } = require("../service/userService");
// db.sequelize.sync();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/usertest",function(req,res,next){
  let users = db.users.findAll({});
  res.render(users);
})


router.post('/home',async function(req,res,next){
  // check the login id and password
  // if correct render home.ejs
  // Extract username and password from request body
  let username = req.body.username;
  let password = req.body.password;

  // Call the checkLogin function to authenticate the user
  let userLoggedIn = await checkLogin(username, password);

  // If login is successful
  if (userLoggedIn) {
    // Store the username in the session
    req.session.username = username;
    console.log("send to home page");

    // Render the home page with any necessary data
    res.render("home", { username: username }); // Passing username to home.ejs
  }
  // else if failed login, render index.ejs with error message
  // else redirect to home page
  else {
    // res.redirect("/"); // back to home page
    res.render("index", { message: "Password is not correct." });
  }
  


});
router.get('/logout', function(req, res, next) {
  // Destroy the user session
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      res.redirect('/');
    } else {
      // Redirect to the home page after logout
      res.redirect('/');
    }
  });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount');
});


// router.post('/createAccount', async function(req, res, next) {
//   try {
//       const { username, password, confirmpassword, email } = req.body;

//       // Validate form data
//       if (!username || !password || !confirmpassword || !email) {
//           return res.render("createAccount", { message: "All fields are required." });
//       }

//       if (password !== confirmpassword) {
//           return res.render("createAccount", { message: "Passwords do not match." });
//       }

//       // Check if the username is already taken
//       const existingUser = await db.users.findOne({ where: { username: username } });
//       if (existingUser) {
//           return res.render("createAccount", { message: "Username is already taken." });
//       }

//       // Hash the password before saving it to the database
//       const hashedPassword = await hashPass(password);

//       // Create a new user
//       const newUser = await db.users.create({
//           username: username,
//           passwordhash: hashedPassword,
//           email: email
//       });

//       // Redirect to the login page or any other page as needed
//       res.redirect('/login'); // Adjust the route accordingly
//   } catch (error) {
//       console.error("Error creating account:", error);
//       res.render("createAccount", { message: "Error creating account." });
//   }
// });
router.post("/create", async(req,res,next)=>{

  //spread operator - didnt worked here
  //const user = {...req.body};

  const user = req.body;
  const password = user.password;

  
  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = {
    username: user.username,
    hashed_password: hashedPassword,
    gender: user.gender,
    mobile: user.mobile,
    email: user.email,
    picture: user.picture,
    profile_text: user.profiletext
  };

  const userSaved = await db.users.create(newUser);
  res.render('index', {message: 'Account created successfully'});
})

router.post('/checkAvailability', async (req, res) => {
  const requestedUsername = req.body.username;

  try {
      const user = await db.users.findOne({ where: { username: requestedUsername } });

      // Check if the username is available
      if (user !== null) {
          res.json({ available: false });
      } else {
          res.json({ available: true });
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/usertext", async function(req,res,next){
  let users = await db.users.findAll({});
  res.render(users);
})
module.exports = router;
