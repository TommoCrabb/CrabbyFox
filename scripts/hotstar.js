console.log(">>> hotstar.js loaded");

(function() {

	greasecrab.button({
		label: "Show Replays Only",
		action: showReplaysOnly
	});

	function showReplaysOnly() {
		let articles = document.querySelectorAll('article.sports-card');
		for (let a of articles) {
			let d = a.querySelectorAll('div.replay-badge');
			if (d.length == 0) a.style.display = "none";
		}
	}
})();
