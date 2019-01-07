console.log(">>> CONGRATULATIONS! You clicked a button.");

var x = document.getElementsByTagName("a");
console.log(x.length);
browser.runtime.sendMessage(x.length);
