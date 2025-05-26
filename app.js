require ("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const session = require("express-session");

const app = express();
const PORT = 5000 || process.env.PORT;

// connect to database
connectDB();

// express urlencoded (to get request body)
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
	secret: "amradhwenblog",
	resave: false,
	saveUninitialized: true,
	store: mongoStore.create({
		mongoUrl: process.env.MONGODB_URI
	})
}));
app.use(methodOverride("_method"));

// static (stylesheets, images, scripts...etc)
app.use(express.static("public"))

// Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(PORT, ()=>{
	console.log(`Server Listening on port ${PORT}`)
})