console.log(">>> GREASECRAB: debug.js loaded");

/*
var x = document.createElement("script");
x.text = `
console.log('>>> Injected script running');
var api = document.getElementById("movie_player");
//api.setVolume(50);
for (let y in api) {
	console.log(y);
}

console.log( api.getPlayerState() );
window.addEventListener("message", getMessage, false);

function getMessage(e) {
	for (let i in e.data) {
		api[i](...e.data[i]);
	}
}
`;
document.body.appendChild(x);

window.postMessage({
	"setVolume" : ["90"],
	"setSizeStyle" : ["2"]
}, "*");

browser.runtime.onMessage.addListener(relayMessage);

function relayMessage(message) {
	console.log(">>> " + message.message);
}

// window.addEventListener("click", messageBG);

function messageBG(e) {
	var send = browser.runtime.sendMessage({
		message : "Window clicked."
	}).then(
		function(response) {
			console.log(">>> RESPONSE: " + response.message);
		},
		function(error) {
			console.log(">>> ERROR: " + error);
		}
	);
}

*/
