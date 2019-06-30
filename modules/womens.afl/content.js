console.log(">>> LOADED: /modules/womens.afl/content.js");

/*
///Test Injection///

var s = document.createElement("script");
s.src = browser.extension.getURL("modules/womens.afl/injected.js");
s.onload = function() {
	console.log(">>> ATTEMPTED TO INJECT CODE");
}
document.body.appendChild(s);

///End Test///
*/

// COMMENT: Build an object "data" that will be sent to the popup script

var meta = document.querySelectorAll('script[data-match-structure]');
meta = JSON.parse(meta[0].text);

var data = {
	message : "vid info",
	meta : meta,
	vids : { }
};

var articles = document.querySelectorAll('article.js-video-list-item');
for (let a of articles) {
	let v = {
		done : false,
		tries : 0
	};
	v.duration = a.querySelectorAll('span.video-duration__duration')[0].innerHTML;
	v.title = a.getAttribute('data-title-override');
	v.id = a.getAttribute('data-embed-code');
	data.vids[v.id] = v;
}

// COMMENT: Set up a messaging port to popup script

var bgPort = browser.runtime.connect({name: "womens.afl content"});
bgPort.onMessage.addListener( function(m) {
	console.log(">>> RECEIVED MESSAGE: " + m.message);
	switch (m.message) {
	case "go":
		console.log(">>> SENDING DATA FROM CONTENT.JS TO POPUP.JS");
		console.log(data);
		bgPort.postMessage(data);
		break;
	case "play":
		console.log(">>> CONTENT.JS RECEIVED DATA FROM POPUP.JS");
		play(m.id);
		break;
	}
});

// COMMENT: Play video when asked by popup

var click = new Event("click");

function play(id){
	let v = data.vids[id];
	let e = articles.querySelectorAll('[data-embed-code=' + id + ']')[0];
	if ( e.classList.contains("is-playing") ) {
		console.log(">>> SKIPPING VIDEO WITH ID: " + id)
		bgPort.postMessage({
			message : "skipped",
			id : id
		})
	} else {
		console.log(">>> PLAYING VIDEO WITH ID: " + id)
		e.dispatchEvent(click);
		bgPort.postMessage({
			message : "started playing",
			id : id
		});
	}
}

