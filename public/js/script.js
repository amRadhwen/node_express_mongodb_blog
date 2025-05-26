document.addEventListener("DOMContentLoaded", function(){
	const searchButton = document.querySelector(".searchBtn");
	const searchBar = document.querySelector(".searchBar");
	const searchInput = document.getElementById("searchInput");
	const searchClose = document.getElementById("searchClose");

	//for(let i = 0; i < allButtons.length; i++) {
		searchButton.addEventListener("click", function(e){
			searchBar.style.visibility = 'visible';
			searchBar.classList.add("open");
			this.setAttribute("aria-expanded", "true");
			searchInput.focus();
			console.log(this);
		})
	//}

	searchClose.addEventListener("click", function(e) {
		searchBar.style.visibility = "hidden";
		searchBar.classList.remove("open");
		searchButton.setAttribute("aria-expanded", "false");
	})

	const adminDeletePostBtn = document.getElementById("delete-post-btn");
	adminDeletePostBtn.addEventListener("click", function(e){
		const response = confirm("Are you shure?");
		if(!reponse) {
			e.preventDefault();
		}
	})


})