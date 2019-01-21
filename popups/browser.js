console.log(">>> CRABBYFOX SCRIPT LOADED: browser popup");

function makeListItem(tab) {
	let item = document.createElement("div");
	item.className = "listItem";
	item.id = tab.id;
	let cb = document.createElement("input");
	cb.type = "checkbox";
	cb.className = "listItemCheckbox";
	cb.setAttribute("data-id", tab.id);
	cb.setAttribute("data-text", tab.url);
	item.appendChild(cb);
	let text = document.createElement("span");
	text.className = "listItemText";
	text.innerHTML = tab.url;
	text.onclick = function (){
		browser.tabs.update(
			tab.id,
			{ active : true }
		).catch(
			function(error) {
				console.log(">>> ERROR: " + error);
			}
		);
	}
	item.appendChild(text);
	return item;
}

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
			for (let tab of tabs) {
				if ( re.test(tab.url) == true ) {
					let box = makeListItem(tab);
					result.appendChild(box);
					count++;
				}
			}
			let countBox = document.createElement("div");
			countBox.innerHTML = count + " tabs.";
			result.insertBefore(countBox, result.firstChild);
		}
	).catch(
		function(error) {
			console.log(">>> TAB QUERY FAILED: " + error);
		}
	);
}

function selectAll(e) {
	var result = document.getElementById("result");
	var items = result.getElementsByTagName("input");
	for (i of items) {
		i.checked = true;
	}
}

function selectNone(e) {
	var result = document.getElementById("result");
	var items = result.getElementsByTagName("input");
	for (i of items) {
		i.checked = false;
	}
}

function filterIn(e) {
	var result = document.getElementById("result");
	var items = result.getElementsByTagName("input");
	var kills = [ ] ;
	for (let i of items) {
		if (i.checked == false) kills.push( i.getAttribute("data-id") );
	}
	for (let k of kills) {
		let x = document.getElementById(k);
		result.removeChild(x);
	}
}

function filterOut(e) {
	var result = document.getElementById("result");
	var items = result.getElementsByTagName("input");
	var kills = [ ] ;
	for (let i of items) {
		if (i.checked == true) kills.push( i.getAttribute("data-id") );
	}
	for (let k of kills) {
		let x = document.getElementById(k);
		result.removeChild(x);
	}
}

function copyToClip(e) {
	var clip = document.createElement("textarea");
	clip.type = "text";
	var result = document.getElementById("result");
	var items = result.getElementsByTagName("input");
	for (i of items) {
		if (i.checked == true) {
			clip.value += i.getAttribute("data-text") + "\n";
		}
	}
	//navigator.clipboard.writeText(slip).catch( function(error) { console.log(">>> ERROR: " + error) } );
	document.body.insertBefore(clip, document.body.firstChild);
	clip.select();
	document.execCommand("copy");
	document.body.removeChild(clip);
}

var button = document.getElementById("getTabUrls");
button.addEventListener("click", tabQuery);

var button = document.getElementById("selectAll");
button.addEventListener("click", selectAll);

var button = document.getElementById("selectNone");
button.addEventListener("click", selectNone);

var button = document.getElementById("copyToClipboard");
button.addEventListener("click", copyToClip);

var button = document.getElementById("filterIn");
button.addEventListener("click", filterIn);

var button = document.getElementById("filterOut");
button.addEventListener("click", filterOut);

tabQuery();
