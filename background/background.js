console.log(">>> CRABBYFOX SCRIPT: background.js");

browser.webRequest.onBeforeRequest.addListener(
	cricketListener,
	{urls: ["*://*.akamaihd.net/*/ap-southeast-2/5833133821001/profile_*/chunklist_dvr.m3u8*"]}
);

function cricketListener(input) {
	var url = input.url.replace(
			/^https?:\/\/.*\.(akamaihd.net\/.*\/ap-southeast-2\/5833133821001\/profile)_.\/(chunklist_dvr.m3u8).*/,
		"https://cricketalive1-a.$1_0/$2" );
	console.log(">>> " + url);
/*	browser.tabs.sendMessage(
		input.tabId,
		{ message : url }
	); 
*/
	var send = browser.runtime.sendMessage({
		message : url
	}).then(
		function(response) {
			console.log(">>> RESPONSE: " + response.message);
		},
		function(error) {
			console.log(">>> ERROR: " + error);
		}
	);

}

function testScope(x) {
	console.log(">>> " + x);
}
