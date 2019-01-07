console.log(">>> cfake.js loaded");

(function() {

	var links = document.getElementsByTagName('a');
	var regex = /^javascript:showimage\('\/big.php\?show=(.*jpe?g)&.*$/;

	for (var i = 0 ; i < links.length ; i++) {
		var href = links[i].getAttribute('href');
		var match = regex.exec(href);
		if (match != null) {
			var link = 'http://cfake.com/medias/ophotos/' + match[1];
			links[i].setAttribute('href', link);
		}
	}

	if ( /cfake.com\/medias\/ophotos/.test(location.href) ) {
		var h1s = document.getElementsByTagName('h1');
		if ( h1s.length > 0 ) location.href = location.href.replace( '/ophotos/', '/photos/' );
	}

})();
