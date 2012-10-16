window.onload = function() {
	var tweetsSection = document.getElementsByClassName("tweets")[0],
		worker = new Worker("tweets-fetcher.js");

	worker.onmessage = function(event) {
		Array.prototype.forEach.call(event.data, function(tweet) {
			var tweetElement = createTweetElement(tweet);
			tweetsSection.insertBefore(tweetElement, tweetsSection.firstElementChild);
			addDragStartEventListener(tweetElement);
		});
	};

	initDragAndDrop();

	function createTweetElement(tweet) {
		var tweetElement = document.createElement("article"),
			tweetContentElement = document.createElement("section"),
			tweetFooterElement = document.createElement("footer");
		
		tweetElement.id = tweet.id;
		tweetElement.className = "tweet";
		tweetElement.setAttribute("draggable", "true");
		
		tweetContentElement.innerHTML = tweet.text;
		tweetFooterElement.innerHTML = "Created the " + tweet.created_at;
		tweetFooterElement.innerHTML += " by @" + tweet.from_user + ".";

		tweetElement.appendChild(tweetContentElement);
		tweetElement.appendChild(tweetFooterElement);

		return tweetElement;
	}

	function initDragAndDrop() {
		var favoritesZone = document.querySelector("#favorites .tweets[dropzone]"),
			draggableTweets = document.querySelectorAll("#timeline .tweet[draggable]");

		favoritesZone.addEventListener("dragover", function(event) {
			event.preventDefault();
		});
		favoritesZone.addEventListener("drop", function(event) {
			var tweetId = event.dataTransfer.getData("text");
			var tweetElement = document.getElementById(tweetId);
			this.appendChild(tweetElement);
		});
		Array.prototype.forEach.call(draggableTweets, addDragStartEventListener);
	}

	function addDragStartEventListener(tweet) {
		tweet.addEventListener("dragstart", function(event) {
			event.dataTransfer.setData("text", this.id);
		});
	}
};