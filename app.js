require ("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");


const app = express();
const PORT = 5000 || process.env.PORT;

// connect to database
connectDB();

// static (stylesheets, images, scripts...etc)
app.use(express.static("public"))

// Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes
app.use("/", require("./server/routes/main"));

app.listen(PORT, ()=>{
	console.log(`Server Listening on port ${PORT}`)
})