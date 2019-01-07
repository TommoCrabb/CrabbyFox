var b = document.getElementById("getLinks");
b.addEventListener("click", function() {
	clickButton(b);
});

function clickButton(b) {
	browser.tabs.executeScript({
		file : "payload.js"
	}).then(
		function() {
			b.innerHTML = "Score!";
		}
	).catch(
		function() {
			b.innerHTML = "Fail!";
		}
	);
}

browser.runtime.onMessage.addListener(getAnswer);

function getAnswer(a) {
	var d = document.getElementById("answer");
	d.innerHTML = a;
}

var o = document.getElementById("options");
o.addEventListener("click", function() {
	browser.runtime.openOptionsPage();
});
