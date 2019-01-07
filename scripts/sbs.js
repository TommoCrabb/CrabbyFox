console.log(">>> sbs.js loaded");

(function() {

	greasecrab.button({
		label : "Get Eps",
		action : getEpUrls
	});

	function getEpUrls() {
		var list = new Object();
		console.log(">>> BUTTON CLICKED");

		var videos = document.querySelectorAll('p.episode__title');
		console.log(videos.length + ' videos found.');
		for ( let item of videos ) {
			
  			var links = item.querySelectorAll('a[data-ng-href]');
  			if ( links.length != 1 ) alert( links.length + ' links found, when there should be 1');
  			var matches = links[0].getAttribute('data-ng-href').match(/(ondemand\/video\/[0-9]+)\/(.*)$/);
  			if ( matches == null ) alert('Regex match returned null');
  			var link = 'https://www.sbs.com.au/' + matches[1] ;
			var title = matches[2] ;
			
			var eps = item.querySelectorAll('span[data-ng-if="Episode.episode"]');
			if ( eps.length != 1 ) alert( eps.length + ' eps found, when there should be 1');
			var ep = eps[0].innerHTML ;
			
  			list[title + " - " + ep] = link;
			
		}
		greasecrab.overlay(list);

	}
})();
