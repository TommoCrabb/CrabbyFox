var button = document.getElementById("button");
button.addEventListener("click", function(e){
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
				id : "/modules/sbs.com.au/content.js",
				message : "get episode urls"
			}
		).then( function(reply){
			let result = document.getElementById("result");
			result.innerHTML = "";
			for (let i in reply) {
				let box = document.createElement("div");
				box.innerHTML = reply[i] + " # " + i ;
				result.appendChild(box);
			}
		}).catch( function(error){
			console.log(">>> ERROR: " + error);
		});
	}).catch( function(error){
		console.log(">>> ERROR: " + error);
	});
});
