console.log(">>> GREASECRAB: common.js loaded");

var greasecrab = new Object() ;

greasecrab.button = function({label = "*ERROR*", action = undefined, href = "#", filename = undefined, send} = {}) {

	if (typeof greasecrab.buttonPanel === "undefined") greasecrab.makeButtonPanel();

	var button = document.createElement("a");
	button.innerHTML = label;
	button.onclick = action;
	button.href = href;
	button.download = filename;

	button.style.display = "inline-block";
	button.style.border = "solid white 2px";
	button.style.borderRadius = "3px";
	button.style.color = "white";
	button.style.margin = "5px";
	button.style.padding = "3px";

	if (send == "return") {
		return button
	} else {
		greasecrab.buttonPanel.append({
			item : button,
			type : "anchor"
		});
	}
}

greasecrab.makeButtonPanel = function() {
	var panel = document.createElement("div");
	panel.style.width = "100%";
	panel.style.position = "fixed";
	panel.style.color = "white";
	panel.style.backgroundColor = "black";
	panel.style.zIndex = "10000";
	panel.style.top = "0";
	panel.style.left = "0";
	panel.style.textAlign = "left";
	panel.innerHTML = " GC ";
	document.body.appendChild(panel);
	greasecrab.buttonPanel = panel;
	greasecrab.buttonPanel.append = function({item, type = "anchor"} = {}) {
		greasecrab.buttonPanel.appendChild(item);
	}
}

greasecrab.overlay = function(input) {

	if (typeof greasecrab.overlayPanel === "undefined") greasecrab.makeOverlayPanel();

	if (typeof input === "string") {

		let item = document.createElement("div");
		item.innerHTML = input;
		greasecrab.overlayPanel.append(item);

	} else if (Array.isArray(input) === true) {

		for (let i of input) greasecrab.overlay(i);

	} else if (input.nodeType === Node.ELEMENT_NODE ) {

		greasecrab.overlayPanel.append(input);

	} else if (typeof input === "object") {

		for (let i in input) {
			if (typeof input[i] === "string") {
				greasecrab.overlay( input[i] + " # " + i );
			} else {
				greasecrab.overlay( '# ' + i + '(' + typeof input[i] + ')' );
				greasecrab.overlay( input[i] );
			}
		}
	}
}

greasecrab.makeOverlayPanel = function() {
	var panel = document.createElement("div");
	panel.style.backgroundColor = "black";
	panel.style.color = "white";
	panel.style.width = "100%";
	panel.style.height = "100%";
	panel.style.position = "fixed";
	panel.style.top = "0";
	panel.style.left = "0";
	panel.style.zIndex = "11000";
	panel.style.overflowY = "scroll";
	greasecrab.overlayPanel = panel;
	document.body.appendChild(panel);
	// CLOSE BUTTON
	var close = greasecrab.button({
		label : "CLOSE OVERLAY",
		send : "return",
		action : function() {
			panel.parentElement.removeChild(panel);
			greasecrab.overlayPanel = undefined;
		}
	});
	panel.appendChild(close);
	// APPEND
	greasecrab.overlayPanel.append = function(item) {
		panel.appendChild(item);
	}
}
