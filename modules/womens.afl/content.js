console.log(">>> LOADED: /modules/womens.afl/content.js");

var bgPort = browser.runtime.connect({name: "womens.afl content"});
bgPort.onMessage.addListener( function(m) {
	switch (m.message) {
	case "go":
		go();
		break;
	case "play":
		play(m.id);
		break;
	}
});

var click = new Event("click");
var items = [];

function go() {
	var meta = document.querySelectorAll('script[data-match-structure]');
	meta = JSON.parse(meta[0].text);
	var vids = document.querySelectorAll('article.js-video-list-item');
	for (v of vids) {
		items.push({
			duration : v.querySelectorAll('span.video-duration__duration')[0].innerHTML,
			title : v.getAttribute('data-title-override')
		});
	}
	bgPort.postMessage({
		message: "vid info",
		items: items,
		meta: meta
	});
}

function play(id){
	items[id].fireEvent(click);
}
