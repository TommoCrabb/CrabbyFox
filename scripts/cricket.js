console.log(">>> CRABBYFOX SCRIPT: cricket.js");

/*
(function() {
	var send = browser.runtime.sendMessage({
		run : "cricket"
	}).then(
		function(reply) {
			console.log(">>> RESPONSE: " + reply.message);
		},
		function(error) {
			console.log(">>> ERROR: " + error);
		}
	);
})();
*/

browser.runtime.onMessage.addListener(foundPlaylist);

function foundPlaylist(input) {
	alert(input.message);
}
