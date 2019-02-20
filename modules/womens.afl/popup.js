var vdata = "";
var	lastUrlMatch = "";
var	urlCounter = 0;
var skipped = 0;

var cPort;
browser.runtime.onConnect.addListener(
	function(p) {
		if (p.name == "womens.afl content") {
			cPort = p;
			cPort.onMessage.addListener(fromCPort);
			cPort.postMessage({message: "go"});
		}
	}
);

function fromCPort(m) {
	switch (m.message) {
	case "vid info":
		console.log(">>> vid info");
		console.log(m);
		vdata = m;
		urlCounter = 0;
		skipped = 0;
		playVid(0);
		break;
	case "started playing":
		console.log(">>> STARTED PLAYING: " + m.id);
		if (m.id == 0) {
			startListener();
		}
		break;
	case "skipped":
		console.log(">>> SKIPPED: " + m.id);
		urlCounter++;
		skipped++;
		playVid(urlCounter);
		break;
	}
}

function startListener() {
	browser.webRequest.onBeforeRequest.addListener(
		urlMatch,
		{urls: [
			"https://bpmultihlsvods257.ngcdn.telstra.com/hls-vod/ingest_aflfilms_vod/*/VOD_Source/*/output_*kbps_*p.mp4.m3u8*"
		]}
	);
}

function urlMatch(i) {
	var playlist = i.url.replace(
			/^(https?:\/\/.*\/output)_\d+kbps_\d+p(\.mp4\.m3u8).*/,
		"$1_2400kbps_720p$2"
	);
	if (playlist != lastUrlMatch) {
		console.log(">>> Item " + vdata.items[urlCounter] + " = " + playlist);
		lastUrlMatch = playlist
		vdata.items[urlCounter].url = playlist;
		writeInfo(urlCounter);
		urlCounter++;
		playVid(urlCounter);
	}
}

function writeInfo(n) {
	console.log(">>> OUTPUT: ");
	console.log(vdata.items[n]);
}

function playVid(n) {
	if (n < vdata.items.length) {
		cPort.postMessage({
			message : "play",
			id : n
		})
	} else if (skipped > 0) {
		cPort.postMessage({
			message : "send skipped"
		});
	}
}

var get_button = document.getElementById('getPlaylists');
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
	}).catch(function(e) {
		console.log(">>> ERROR: " + e);
	});
	get_button.parentElement.removeChild(get_button);
});

