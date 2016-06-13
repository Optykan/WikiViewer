//don't pollute the global namespace
(function(){
	'use strict';
	
	var WikiInterface={

		initialize: function(){
			console.log("WikiInterface initialized");
		},
		handler: function(data, status){
			console.log(data);
		},
		query: function(q){
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php",
				data:{
					"action": "opensearch",
					"format": "json",
					"search": q
				},
				success: this.handler
			});
		}

	};

	WikiInterface.initialize();
	$(document).foundation();

})();