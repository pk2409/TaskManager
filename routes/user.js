const express= require("express")

const {userSignup}=require('../controllers/user')
const {userLogin}=require('../controllers/user')
const router = express.Router();

//how can we signup
router.post('/',userSignup);
router.post("/login",userLogin)

module.exports=router;