var express = require('express');
var router = express.Router();
const db=require("../models");
db.employee.sync();
/* GET users listing. */

//////////////////////////////////////////////////////////////////////
router.get("/:id",async function(req,res,next){
    const empId=req.params.id;
    const emp = await db.employee.findAll({ where : {empid:empId}});
    res.send(emp);
});
router.post("/create",async (req,res,next)=>{
    const emp=req.body;
    let savedemp = await db.employee.create(emp);
    res.send(savedemp);
})
router.put("/update", async (req,res,next)=>{
    const emp=req.body;
    const empId=req.body.empid;
    let updated= await db.employee.update({ },{where:{empid:empId}});

    //and update this employee
    res.send(updated);
})
router.delete("/:id",async function(req,res,next){
    const empId=req.params.id;
    await db.employee.destroy({ where : {empid:empId}});
    res.send("deleted succesfully");
});
/////////////////////////////////////////////////////////////


router.get('/', async function(req, res, next) {
    let emps=await db.employee.findAll({});
    // let emps=await db.employee.findAll({
    //     where:{empid:1}
    // });
    res.send(emps);
//   res.send('respond with a resource');
});
router.post("/",async (req,res,next)=>{
    let emp ={
        name:"pratham",
        email:"p1@",
        gender:"f"
    }
    let savedemp=await db.employee.create(emp);
    res.send(savedemp);
})

router.delete("/",async (req,res,next)=>{
    await db.employee.destroy({ where : {empid:2}});
    res.send("deleted succesfully");
})
router.put("/",async (req,res,next)=>{
    let updated= await db.employee.update({ email:"dm@1"},{where:{empid:1}});
    res.send(updated);
})
module.exports = router;
