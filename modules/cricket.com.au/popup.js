browser.runtime.sendMessage({
	id : "cricket.com.au",
	message : "gimme playlist url"
}).then( function(reply){

	var result = document.getElementById("result");
	result.innerHTML = reply.message;

}).catch( function(error){
	console.log(">>> ERROR: " + error);
});
