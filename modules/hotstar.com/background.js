console.log(">>> CRABBYFOX SCRIPT LOADED: modules/hotstar.com/background.js");

var hotstar = {
	filter : {
		url : [
			{ urlMatches : "^https://www\.hotstar\.com/.*" }
		]
	}
} ;

hotstar.init = function(input) {
	console.log(">>> Navigating to hotstar.com in tab #" + input.tabId );
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/hotstar.com/popup.html"
	});
	browser.tabs.executeScript(
		input.tabId,
		{ file : "/modules/hotstar.com/content.js" }
	);
}

browser.webNavigation.onDOMContentLoaded.addListener( hotstar.init, hotstar.filter );
