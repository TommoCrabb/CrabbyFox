console.log(">>> CRABBYFOX SCRIPT LOADED: modules/womens.afl/background.js");

var aflw = {
	filter : {
		url : [
			{ urlMatches : "^https://womens.afl/match-centre/.*" }
		]
	},
} ;

aflw.init = function(input) {
	console.log(">>> Navigating to womens.afl in tab #" + input.tabId );
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/womens.afl/popup.html"
	});
}

aflw.requestListener = function() {
	browser.webRequest.onBeforeRequest.addListener(
		aflw.playlistener,
		{urls: [
			"https://bpmultihlsvods257.ngcdn.telstra.com/hls-vod/ingest_aflfilms_vod/*/VOD_Source/*/output_*kbps_*p.mp4.m3u8*"
		]}
	);
}

aflw.playlistener = function(input) {
	console.log(">>> aflw.playlistener fired in tab #" + input.tabId);
	aflw.playlist = input.url.replace(
			/^(https?:\/\/.*\/output)_\d+kbps_\d+p(\.mp4\.m3u8).*/,
		"$1_2400kbps_720p$2"
	);
	console.log(">>> " + aflw.playlist);
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/womens.afl/popup.html"
	});
	browser.webRequest.onBeforeRequest.removeListener(aflw.playlistener);
}

browser.webNavigation.onDOMContentLoaded.addListener(
	aflw.init,
	aflw.filter
);

/*
browser.runtime.onMessage.addListener(
	function(message, sender, sendResponse){
		if (message.id != "womens.afl") return;
		if (message.message == "gimme playlist url") {
			sendResponse({
				message : aflw.playlist
			});
		}
	}
);
*/
