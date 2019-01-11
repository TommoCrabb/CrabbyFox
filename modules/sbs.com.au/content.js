console.log(">>> CRABBYFOX SCRIPT LOADED: modules/sbs.com.au/content.js");

browser.runtime.onMessage.addListener(getEpUrls);

function getEpUrls(message, sender, sendResponse) {
	if ( message.id != "/modules/sbs.com.au/content.js" || message.message != "get episode urls" ) {
		console.log(">>> ID or message did not match");
		return;
	}
	
	var list = new Object();
	console.log(">>> Content script fired.");

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
	sendResponse(list);
}

