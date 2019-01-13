console.log(">>> CRABBYFOX SCRIPT LOADED: modules/hotstar.com/content.js");

browser.runtime.onMessage.addListener(showOrHide);

function showOrHide(message, sender, sendResponse) {
	if ( message.id != "/modules/hotstar.com/content.js" ) {
		console.log(">>> ID did not match");
		return;
	}
	let articles = document.querySelectorAll('article.sports-card');
	for (let a of articles) {
		let d = a.querySelectorAll('div.replay-badge');
		if (d.length == 0) {
			if (message.message == "show replays") {
				a.parentElement.parentElement.style.display = "none";
			} else if (message.message == "show all") {
				a.parentElement.parentElement.style.display = "inline";
			}
		}
	}
}

