console.log(">>> CRABBYFOX SCRIPT LOADED: modules/sbs.com.au/background.js");

var sbs = {
	filter : {
		url : [
			{ urlMatches : "^https://www\.sbs\.com\.au/ondemand/program/.*" }
		]
	}
} ;

sbs.init = function(input) {
	console.log(">>> Navigating to SBS in tab #" + input.tabId );
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/sbs.com.au/popup.html"
	});
	browser.tabs.executeScript(
		input.tabId,
		{ file : "/modules/sbs.com.au/content.js" }
	);
}

browser.webNavigation.onDOMContentLoaded.addListener( sbs.init, sbs.filter );
