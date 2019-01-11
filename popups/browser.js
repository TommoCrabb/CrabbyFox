console.log(">>> CRABBYFOX SCRIPT LOADED: browser popup");

function tabQuery(e) {
	browser.tabs.query(
		{}
	).then(
		function(tabs) {
			var result = document.getElementById("result");
			result.innerHTML = "";
			let urlRegex = document.getElementById("urlRegex").value;
			var re = new RegExp( urlRegex, "i" );
			var count = 0;
			//var matchedTabs = [ ];
			for (let tab of tabs) {
				if ( re.test(tab.url) == true ) {
					//matchedTabs.push(tab);
					let box = document.createElement("div");
					box.innerHTML = tab.url;
					result.appendChild(box);
					count++;
				}
			}
			let countBox = document.createElement("div");
			countBox.innerHTML = count + " tabs.";
			result.insertBefore(countBox, result.firstChild);
			
			// for (let tab of matchedTabs) {
			// 	let box = document.createElement("div");
			// 	box.innerHTML = tab.url;
			// 	result.appendChild(box);
			// }
		},
		function(error) {
			console.log(">>> TAB QUERY FAILED: " + error);
		}
	);
}	

var button = document.getElementById("getTabUrls");
button.addEventListener("click", tabQuery);

