console.log(">>> LOADED: /modules/womens.afl/content.js");
/*
var click = new Event("click");
var vids = document.querySelectorAll('article.js-video-list-item');
for (let v of vids) {
	v.classList.remove("is-playing");
}



///Test Injection///

var s = document.createElement("script");
s.src = browser.extension.getURL("modules/womens.afl/injected.js");
s.onload = function() {
	console.log(">>> ATTEMPTED TO INJECT CODE");
}
document.body.appendChild(s);

///End Test///
*/
var click = new Event("click");
var vids = document.querySelectorAll('article.js-video-list-item');
var meta = document.querySelectorAll('script[data-match-structure]');
meta = JSON.parse(meta[0].text);

var bgPort = browser.runtime.connect({name: "womens.afl content"});
bgPort.onMessage.addListener( function(m) {
	switch (m.message) {
	case "go":
		go(vids);
		break;
	case "play":
		play(m.id);
		break;
	case "send skipped":
		
	}
});

function go(vids) {
	var items = [];
	for (let v of vids) {
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
	console.log(">>> PLAY ID: " + id)
	if ( vids[id].classList.contains("is-playing") ) {
		bgPort.postMessage({
			message : "skipped",
			id : id
		})
	} else {
		vids[id].dispatchEvent(click);
		bgPort.postMessage({
			message : "started playing",
			id : id
		});
	}
}

