var nodemailer = require('nodemailer');
require('dotenv').config();
const otpgenerator = require("otp-generator");
const otp = otpgenerator.generate(5);

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAILFROM,
        pass:process.env.EMAILAPPPASS
    },
    tls:{rejectUnauthorised: false}
});
function sendTestEmail(to,text,html)
{
    var mailOptions = {
        from:"Dhruv Malik <dhruv1212malik@gmail.com>",
        to: to||"yashasviyadav2407@gmail.com",
        subject:'Nodemailer Twitter test email',
        text:text||'Email form Twix app '+otp,
        html:html||"<h3> Email from Twix app </h3>"+otp
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error){console.log("error :>> ",error);}
        else {console.log("info.response :>> ",info.response);}
    })
}
sendTestEmail();