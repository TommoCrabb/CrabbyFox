function logURL(requestDetails) {
	//console.log("Loading: " + requestDetails.url);
	var f = requestDetails.url.replace(
			/^https?:\/\/.*\.(akamaihd.net\/.*\/ap-southeast-2\/5833133821001\/profile)_.\/(chunklist_dvr.m3u8)/,
		"https://cricketalive1-a.$1_0/$2" );
	console.log(">>> " + f);
}

browser.webRequest.onBeforeRequest.addListener(
	logURL,
	{urls: ["*://*.akamaihd.net/*/ap-southeast-2/5833133821001/profile_*/chunklist_dvr.m3u8"]}
);
