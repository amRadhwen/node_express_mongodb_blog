const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");

// Routes
/**
 * Get /
 * HOME
 * */
router.get("/", async (req, res)=>{
	try {
		const locals = {
		title: "NodeJs Blog",
		description: "Simple Blog created with NodeJs, Express & MongoDB."
		};

		let perPage = 5;
		let page = req.query.page || 1;

		const data = await Post.aggregate([{$sort: {createdAt: -1}}])
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec();

		const count = await Post.countDocuments();
		const nextPage = parseInt(page) + 1;
		const hasNextPage = nextPage <= Math.ceil(count / perPage);

		res.render("index", {
			locals, 
			data,
			current: page,
			nextPage: hasNextPage ? nextPage : null
		});
	} catch(e) {
		console.log(e);
	}
})

/*
router.get("/", async (req, res)=>{
	const locals = {
		title: "NodeJs Blog",
		description: "Simple Blog created with NodeJs, Express & MongoDB."
	};

	try {
		const data = await Post.find();
		res.render("index", {locals, data});
	} catch(e) {
		console.log(e);
	}
})
*/

/**
 * GET /
 * POST :id
 * */
router.get("/post/:id", async (req, res)=>{
	try {
		const slug = req.params.id;
		const data = await Post.findById(slug);
		const locals = {
			title: data.title,
			description: "Simple Blog created with NodeJs, Express & MongoDB."
		};	
		res.render("post", {locals, data});
	} catch(e) {
		console.log(e);
	}
})

/**
 * POST
 * Post - search Term
 * */

router.post("/search", async (req, res)=>{
	try {
		const locals = {
			title: "Search",
			description: "Simple Blog created with NodeJs, Express & MongoDB."
		};

		const searchTerm = req.body.searchTerm;
		const searchNoSpeacialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
		const data = await Post.find({
			$or: [
				{title: {$regex: new RegExp(searchNoSpeacialChar, 'i')}},
				{body: {$regex: new RegExp(searchNoSpeacialChar, 'i')}}
			]
		});
		res.render("search", {locals, data});
	} catch(e) {
		console.log(e);
	}
})

router.get("/about", (req, res)=> {
	res.render("about");
})
































/*
function insertPostData(){
	Post.insertMany([
		{
			title: "building a new post",
			body: "Film shoes industrial grade free-market neural 3D-printed market dolphin. Computer numinous footage systemic car drugs math-tank-traps woman office media urban. Physical refrigerator papier-mache denim gang neon pistol hotdog fetishism boat urban augmented reality. Fetishism smart-carbon boat marketing bridge A.I. crypto-dome wristwatch knife. Girl military-grade human sunglasses industrial grade sprawl RAF denim sensory hacker cardboard marketing soul-delay. Drone Shibuya man systema dissident numinous marketing futurity digital computer Legba RAF geodesic claymore mine advert. Fluidity narrative bridge tattoo 8-bit denim refrigerator Kowloon. Garage bridge shoes sub-orbital towards beef noodles courier ablative carbon faded meta--space. Disposable face forwards monofilament film human grenade pen stimulate. "
		},
		{
			title: "building another post",
			body: "Corporation girl footage table A.I. modem saturation point corrupted skyscraper systema. Assault nodality computer convenience store chrome shrine systemic cartel hacker BASE jump euro-pop fluidity military-grade jeans. Systemic bicycle boy shoes neural math-corrupted ablative neon augmented reality bomb modem-space 3D-printed papier-mache kanji. Decay fluidity denim dome cyber-construct geodesic uplink augmented reality A.I.. Rebar free-market cyber--ware math-San Francisco claymore mine warehouse long-chain hydrocarbons. This is a first post body"
		},
		{
			title: "building a post again",
			body: "Systema office-space sprawl military-grade convenience store numinous tower realism neon tanto. Sign alcohol fetishism bridge franchise sunglasses neural shoes silent boy artisanal tanto military-grade carbon saturation point garage woman. Free-market savant decay gang warehouse rifle tanto cardboard bicycle jeans Kowloon refrigerator dolphin grenade soul-delay. Chrome neon media receding sign smart-dissident office corrupted man nodality paranoid. Dolphin network media order-flow tattoo convenience store towards A.I. beef noodles fluidity drugs sub-orbital youtube man tube. Cyber-tanto shanty town geodesic human footage computer silent tube apophenia stimulate Legba semiotics. This is a first post body"
		},
		{
			title: "This is a new post",
			body: "ware futurity sensory computer rifle physical shoes garage film 3D-printed monofilament faded tank-traps neural car. Man fluidity media spook-ware free-market Chiba skyscraper boat neural corrupted smart-warehouse semiotics youtube. Claymore mine Tokyo tank-traps footage render-farm hacker courier futurity-space dome pistol. RAF motion DIY boy media assault bridge franchise meta-plastic range-rover woman lights semiotics convenience store tower modem. Shanty town lights rain market pistol Shibuya vinyl range-rover systemic advert. Face forwards j-pop voodoo god dolphin vinyl tube San Francisco physical paranoid sprawl sunglasses. This is a first post body"
		},
		{
			title: "My new post title",
			body: "Dolphin tower courier free-market otaku decay shoes narrative market geodesic bridge sprawl artisanal receding faded sunglasses towards. Realism marketing dissident skyscraper digital nodal point neon pre-wristwatch apophenia shoes sentient tower convenience store assassin. Boat RAF systemic vinyl human 3D-printed face forwards camera concrete shrine. Woman boat physical narrative disposable pre-San Francisco media 8-bit office tattoo augmented reality knife dead papier-mache faded uplink. Man military-grade drone sub-orbital singularity footage wonton soup papier-mache alcohol skyscraper meta. Numinous ablative gang range-rover hotdog motion decay human. Skyscraper sensory dead beef noodles youtube pistol face forwards market systemic rain fluidity. "
		}
	])
}

insertPostData();*/

module.exports = router;