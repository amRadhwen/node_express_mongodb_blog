const { Router } = require("express");
const router = Router();

// Routes
router.get("/", (req, res)=>{
	res.send("Hello World !");
})

module.exports = router;