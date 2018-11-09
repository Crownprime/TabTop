var bookmarkTreeNodes = chrome.bookmarks.getTree(
	function(bookmarkTreeNodes) {
		// console.log(bookmarkTreeNodes);
		traverseBookMarks(bookmarkTreeNodes);
	}
);


function traverseBookMarks(bookmarkTreeNodes) {
	for(var i=0;i<bookmarkTreeNodes.length;i++) {
		console.log(bookmarkTreeNodes[i].title,bookmarkTreeNodes[i].url ? bookmarkTreeNodes[i].url : "notfound");

		if(bookmarkTreeNodes[i].children) {
			traverseBookMarks(bookmarkTreeNodes[i].children);
		}
	}
}