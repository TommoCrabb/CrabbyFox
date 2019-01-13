var hideButton = document.getElementById("hide");
hideButton.addEventListener("click", function(e){
	browser.tabs.query({
		currentWindow : true,
		active : true
	}).then( function(tabs){
		if ( tabs.length != 1 ) console.log(">>> The number of active tabs in the current window is " + tabs.length);
		console.log(tabs);
		console.log(">>> tabs[0].tabId = " + tabs[0].tabId);
		browser.tabs.sendMessage(
			tabs[0].id,
			{
				id : "/modules/hotstar.com/content.js",
				message : "show replays"
			}
		).catch( function(error){
			console.log(">>> ERROR: " + error);
		});
	}).catch( function(error){
		console.log(">>> ERROR: " + error);
	});
});

var showButton = document.getElementById("show");
showButton.addEventListener("click", function(e){
	browser.tabs.query({
		currentWindow : true,
		active : true
	}).then( function(tabs){
		if ( tabs.length != 1 ) console.log(">>> The number of active tabs in the current window is " + tabs.length);
		console.log(tabs);
		console.log(">>> tabs[0].tabId = " + tabs[0].tabId);
		browser.tabs.sendMessage(
			tabs[0].id,
			{
				id : "/modules/hotstar.com/content.js",
				message : "show all"
			}
		).catch( function(error){
			console.log(">>> ERROR: " + error);
		});
	}).catch( function(error){
		console.log(">>> ERROR: " + error);
	});
});
