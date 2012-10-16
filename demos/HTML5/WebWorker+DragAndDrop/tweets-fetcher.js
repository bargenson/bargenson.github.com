var URL = "http://search.twitter.com/search.json?q=SUPINFO&callback=processTweets&since_id=",
	updateDelay = 10000,
	lastTweetId;

function getNewTweets() {
	importScripts(URL + lastTweetId);
}

function processTweets(data) {
	if(lastTweetId != data.max_id) {
		lastTweetId = data.max_id;
		postMessage(data.results.reverse());
	}
	setTimeout(getNewTweets, updateDelay);
}

getNewTweets();