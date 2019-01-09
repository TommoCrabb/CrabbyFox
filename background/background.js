console.log(">>> CRABBYFOX SCRIPT: background.js");

//////////////////////////////////////////////////////
/*
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(message, sender, sendResponse) {
	console.log(">>> Message received. Running " + message.run);
	switch (message.run) {
	case "cricket":
		var reply = cricket();
		break;
	}
	sendResponse(reply);
}

function cricket() {
	if ( browser.webRequest.onBeforeRequest.hasListener(cricketListener) == true) {
		return { message : "Already listening for playlist URL." };
	} else {
		browser.webRequest.onBeforeRequest.addListener(
			cricketListener,
*///			{urls: ["*://*.akamaihd.net/*/ap-southeast-2/5833133821001/profile_*/chunklist_dvr.m3u8"]}
/*		);
		return { message : "Started listening for playlist URL." };
	}
}
*/

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
