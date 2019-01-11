console.log(">>> CRABBYFOX SCRIPT LOADED: modules/cfake.com/background.js");

var cfake = {
	filter : {
		url : [
			{ urlMatches : "^http://cfake\.com/picture/.*" }
		]
	}
} ;

cfake.init = function(input) {
	console.log(">>> Navigating to cfake.com in tab #" + input.tabId );
	browser.pageAction.show(input.tabId);
	browser.pageAction.setPopup({
		tabId : input.tabId,
		popup : "/modules/cfake.com/popup.html"
	});
	browser.tabs.executeScript(
		input.tabId,
		{ file : "/modules/cfake.com/content.js" }
	);
}

browser.webNavigation.onDOMContentLoaded.addListener( cfake.init, cfake.filter );
