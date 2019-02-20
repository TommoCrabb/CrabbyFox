console.log(">>> LOADED: /modules/womens.afl/injected.js");

var crabbyfox = { };
crabbyfox.click = new Event("click");
crabbyfox.vids = document.querySelectorAll('article.js-video-list-item');

//crabbyfox.vids[2].dispatchEvent(crabbyfox.click);

for (let v of crabbyfox.vids) {
	v.classList.remove("is-playing");
}
