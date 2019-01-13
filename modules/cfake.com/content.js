console.log(">>> CRABBYFOX SCRIPT LOADED: /modules/cfake.com/content.js");

(function() {

	var links = document.getElementsByTagName('a');
	var regex = /^javascript:showimage\('\/big.php\?show=(.*jpe?g)&.*$/;

	for (let link of links) {
		let href = link.getAttribute('href');
		let match = regex.exec(href);
		if (match != null) {
			let thumbs = link.getElementsByTagName("img");
			let comment = thumbs[0].getAttribute("alt").match(/^ *Fake *: *(.*)$/);

			let img = 'http://cfake.com/medias/ophotos/' + match[1] + "# " + comment[1];
			link.setAttribute('href', img);
		}
	}

	if ( /cfake.com\/medias\/ophotos/.test(location.href) ) {
		var h1s = document.getElementsByTagName('h1');
		if ( h1s.length > 0 ) location.href = location.href.replace( '/ophotos/', '/photos/' );
	}

})();

