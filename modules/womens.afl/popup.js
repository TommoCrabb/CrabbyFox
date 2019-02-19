var pPort;
var cPort;

browser.runtime.onConnect.addListener(
	function(p) {
		switch (p.name) {
		case "womens.afl popup":
			pPort = p;
			pPort.onMessage.addListener(fromPPort);
			pPort.postMessage({message: "init"});
			break;
		case "womens.afl content":
			cPort = p;
			cPort.onMessage.addListener(fromCPort);
			cPort.postMessage({message: "go"});
			break;
		}
	}
);

/*browser.runtime.sendMessage({
	id : "womens.afl",
	message : "gimme playlist url"
}).then( function(reply){

	var result = document.getElementById("result");
	result.innerHTML = reply.message;

}).catch( function(error){
	console.log(">>> ERROR: " + error);
});
*/

// Set up communications with background script
var get_button = document.getElementById('getPlaylists');
/*
var bgPort = browser.runtime.connect({name: "womens.afl popup"});
bgPort.onMessage.addListener( function(m) {
	switch (m.message) {
	case "init":
		getPlaylists();
		break;
	}
});
*/
//function getPlaylists(){
	get_button.innerHTML = "Get m3u playlists";
	get_button.addEventListener("click", function() {
		browser.tabs.query({
			currentWindow: true,
			active: true
		}).then(function(r){
			browser.tabs.executeScript(
				r.id,
				{ file : "/modules/womens.afl/content.js" }
			);
			cPort.postMessage({
				message: "go",
				tabId: r.id
			});
		}).catch(function(e) {
			console.log(">>> " + e);
		});
		get_button.parentElement.removeChild(get_button);
	});
//}

/*
// Set up communications with content script

browser.runtime.onConnect.addListener(portSetup);

function portSetup(p){
	return;
}
*/
/*
function playlistener(i) {
	console.log(">>> TEST: " + i.url);
}

browser.webRequest.onBeforeRequest.addListener(
	playlistener,
	{urls: [
		"https://duckduckgo.com/*"
	]}
);

*/
//////////////////////////


function fromPPort(m) {
	switch (m.message) {
	case "go":
		browser.tabs.executeScript(
			m.tabId,
			{ file : "/modules/womens.afl/content.js" }
		);
		break;
	}
}

function fromCPort(m) {
	switch (m.message) {
	case "vid info":
		console.log(">>> vid info");
		console.log(m);
		break;
	}
}

