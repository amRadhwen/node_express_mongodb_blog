const { Router } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = Router();

const adminLayout = "../views/layouts/admin";

/**
 * Check Login
 * */

const authMiddleware = (req, res, next) => {
 const token = req.cookies.acctoken;
 if(!token) {
 	return res.status(401).json({message: "Unauthorized"})
 }
 try {
 	const decoded = jwt.verify(token, process.env.JWT_SECRET);
 	req.userId = decoded.userId;
 	next()
 } catch(e) {
 	return res.status(401).json({message: "Unauthorized"})
 	console.log(e);
 }
}

/**
 * GET /
 * Admin - Login Page
 * */

router.get("/admin", async(req, res)=>{
	try{
		const locals = {
			title: "Admin",
			description: "Simple Blog created with NodeJs, Express & MongoDB."
		}

		res.render("admin/index", {locals, layout: adminLayout});
	}
	catch(err){
		console.log(err);
	}
});

/**
 * POST /
 * Admin - Check Login
 * */

router.post("/admin", async (req, res)=>{
	try{
		const {username, password} = req.body;
		const user = await User.findOne({username});
		if(!user){
			return res.status(401).json({message: "Invalid credentials"})
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!password){
			return res.status(401).json({message: "Invalid credentials"})
		}
		const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
		res.cookie("acctoken", token, {httpOnly: true});
		res.redirect("/dashboard");
	}
	catch(err){
		console.log(err);
	}
})

/**
 * GET /
 * Admin - Dashboard
 * */

router.get("/dashboard", authMiddleware,(req, res)=>{
	res.render("admin/dashboard");	
});

/*
router.post("/admin", (req, res)=>{
	try{
		const {username, password} = req.body;
		if(username === "admin" && password === "admin") {
			console.log("Welcome Admin");
		}
		else {
			res.send("Wrong username or password");
		}
	}
	catch(err){
		console.log(err);
	}
})
*/
/**
 * POST /
 * Admin - Register
 * */
/*
router.post("/register", async (req, res)=>{
	try{
		const {username, password} = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		try {
			const user = await User.create({username, password: hashedPassword});
			res.status(201).json({message: "USer created", user});
		} catch(e) {
			if(e.code === 11000) {
				res.status(409).json({message: "User already in use"});
			}
			res.status(500).json({message: "Internal Server Error"});
		}
	}
	catch(err){
		console.log(err);
	}
})
*/
module.exports = router;