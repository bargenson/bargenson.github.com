var APP = {

	changeContent: function(content) {
		$.mobile.showPageLoadingMsg();
		
		(function displayOrHideBackButton(content) {
			var header = $("#page-header");
			if(content != "menu") {
				console.log("!menu");
				if(!header.children(".back-button").length) {
					console.log("!children");
					header.prepend("<a class='back-button' href='#menu' data-icon='back'>Back</a>");
				}
			} else {
				if(header.children(".back-button").length) {
					console.log("children");
					header.children(".back-button").remove();
				}
			}
		})(content);

		$.get('pages/' + content + '.mustache.html', function(page) {
			$("div[role='main']").html(page);
			$("#page").page('destroy').page();
			$.mobile.hidePageLoadingMsg();
		});
	}
};

$(document).ready( function(event) {
	var hash, content;
	hash = window.location.hash;
	content = hash ? hash.substr(1) : "menu";
	APP.changeContent(content);
	
	$(document).on("click", "a", function(event) {
		var hash = $(this).attr("href");
		if(hash[0] === "#") {
			window.location.hash = hash;
			APP.changeContent(hash.substr(1));
		}
	});
});