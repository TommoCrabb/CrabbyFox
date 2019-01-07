console.log(">>> Running GreaseCrab script: Rule34 Improvements <<<");

/* ********
   Generate a curl command to download all images linked on a page (paheal only)
*/
(function() {
	if ( /rule34\.paheal\.net\/post\/list/.test(window.location.href) == true ) {
		greasecrab.button({
			label : "Curl All",
			action : function() {
				var links = document.querySelectorAll('a[href*="paheal.net/_images/"');

				var curl = 'curl ';

				for (let i of links) {
					curl += " -o ";
					let tmp = i.href.replace(/^.*\/_images\/([0-9a-f]{32})\/(.*)$/, "'rule34.paheal.net_$1_$2'");
					curl += decodeURIComponent(tmp);
					curl += " " + i.href; 
				}

				greasecrab.overlay(curl);
			}
		});
	}
})();

/*
  Create a button to download full-sized image, with tags included in the file name.
  WORK IN PROGRESS! 
  NOTE: Download property for links requires same origin!
*/
(function() { // label, action, href, filename

	var label = undefined;
	var action = undefined;
	var href = undefined;
	var filename = undefined;

	if ( /s=view/.test(window.location.href) == true ) {

		label = "VIEW ORIGINAL";
		href = getOgImageUrl();
		let data = getSiteAndMd5(href);
		let meta = getMetaData("artist", "copyright", "character");
		href += '#META:' + data[0] + ' ' + meta + ' ' + data[1];

	} else if ( /#META:/.test(window.location.href) == true ) {

		label = "DOWNLOAD ORIGINAL";
		let match = window.location.href.match(/^(.+)#META:(.+)$/);
		href = match[1];
		filename = decodeURIComponent(match[2]);

	} else if ( /paheal\.net\/_images\//.test(window.location.href) == true ) {
		console.log("TEST POSITIVE");
		let match = window.location.href.match(/paheal\.net\/_images\/(.*)\/(.*)$/);
		label = "DOWNLOAD WITH MD5";
		href = window.location.href;
		filename = "rule34.paheal.net_" + match[1] + "_" + decodeURIComponent(match[2]);
	}

	if (label != undefined ) {
		greasecrab.button({
			label : label,
			action : action,
			href : href,
			filename : filename
		});
	}

	function getOgImageUrl() {
		var tags = document.querySelectorAll('meta[property="og:image"]');
		if (tags.length != 1) {
			alert("ERROR: " + tags.length + " og:image tags found. See console for details.");
			for (let item of tags) console.log(">>> ERROR: " + item.content );
		}
		return tags[0].content;
	}

	function getSiteAndMd5(url) {
		var match = url.match(/^https?:\/\/([^/]+\.)?([^\./]+\.[^\./]+)\/(.*\/)?([^/?#]+)([?#].*)?$/);
		return [match[2], match[4]];
	}

	function getMetaData() {
		var string = "";
		for (let arg of arguments) {
			var uniq = new Set();
			var tags = document.getElementsByClassName('tag-type-' + arg);
			for (let tag of tags) {
    			var links = tag.querySelectorAll('a[href*="tags="]');
    			for (let link of links) {
					var match = link.innerHTML.replace(/ /g, '_').replace(/\//g, '|');
      				uniq.add(match);
				}
			}
			string += '{' + arg.toUpperCase() ;
			for (let item of uniq) string += ' ' + item ;
			string += ' }' ;
		}
		return string;
	}
})();
