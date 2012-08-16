var APP = {

	initContent: function() {
		var hash, content;
		hash = window.location.hash;
		content = hash ? hash.substr(1) : "menu";
		this.changeContent(content);
	},

	changeContent: function(content) {
		$.mobile.showPageLoadingMsg();
		$.get('pages/' + content + '.mustache.html', function(page) {
			(function displayOrHideBackButton(content) {
				var header = $("#page-header");
				if(content != "menu") {
					if(!header.children(".back-button").length) {
						header.prepend("<a class='back-button' href='#menu' data-icon='back'>Back</a>");
					}
				} else {
					if(header.children(".back-button").length) {
						header.children(".back-button").remove();
					}
				}
			})(content);
			$("div[role='main']").html(page);
			$("#page").page('destroy').page();
			$.mobile.hidePageLoadingMsg();
		});
	}
};

$(document).ready( function(event) {
	
	APP.initContent();
	
	$(document).on("click", "a", function(event) {
		var hash = $(this).attr("href");
		if(hash[0] === "#") {
			window.location.hash = hash;
			APP.changeContent(hash.substr(1));
		}
	});

	$(window).hashchange(function() {
		APP.initContent();
	});
});