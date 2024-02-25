// const db = require("../models");

// const checkLogin = async(username,password)=>{
//     let user = db.user.findOne({where : {username:username}});
//     console.log('hello')
//     if(user!=null && user.passwordhash == password){
//         return user;
//     }
//     else return false;
// }

// module.exports={checkLogin};

// logic for checking the password
const db = require("../models");
const { hashPass, comparePass } = require("./bcryptService");
const checkLogin = async (username, password) => {
  let user = await db.users.findOne({ where: { username: username } });
  if (user && await comparePass(password,user.passwordhash)) {
    return user;
  } else return undefined;
};
module.exports ={checkLogin};

//userService.js