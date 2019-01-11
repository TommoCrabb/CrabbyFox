console.log(">>> CRABBYFOX SCRIPT LOADED: modules/cricket.com.au/background.js");

var cricket = {
	filter : {
		url : [
			{ urlMatches : "^https://live\.cricket\.com\.au/match/.*" }
		]
	}
} ;

cricket.init = function(input) {
	console.log(">>> Navigating to live.cricket.com.au in tab #" + input.tabId );
	browser.webRequest.onBeforeRequest.addListener(
		cricket.playlistener,
		{urls: ["*://*.akamaihd.net/*/ap-southeast-2/5833133821001/profile_*/chunklist_dvr.m3u8*"]}
	);
}

cricket.playlistener = function(input) {
	console.log(">>> cricket.playlistener fired in tab #" + input.tabId);
	cricket.playlist = input.url.replace(
			/^https?:\/\/.*\.(akamaihd.net\/.*\/ap-southeast-2\/5833133821001\/profile)_.\/(chunklist_dvr.m3u8).*/,
		"https://cricketalive1-a.$1_0/$2" );
	console.log(">>> " + cricket.playlist);
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/cricket.com.au/popup.html"
	});
	browser.webRequest.onBeforeRequest.removeListener(cricket.playlistener);
}

browser.webNavigation.onDOMContentLoaded.addListener(
	cricket.init,
	cricket.filter
);

browser.runtime.onMessage.addListener(
	function(message, sender, sendResponse){
		if (message.id != "cricket.com.au") return;
		if (message.message == "gimme playlist url") {
			sendResponse({
				message : cricket.playlist
			});
		}
	}
);

