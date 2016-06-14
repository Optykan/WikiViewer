//don't pollute the global namespace
(function(){
	'use strict';
	
	var WikiInterface={
		initialize: function(){
			var that=this;
			console.log("WikiInterface initialized");
			$("#search").keypress(function(e){
				if(e.which==13){
					that.query(this.value);
				}
			});
		},
		handler: function(data){
			console.log(data);
		},
		query: function(q){
			var that=this;
			$.ajax({
				method: "GET",
				url: "https://en.wikipedia.org/w/api.php",
				data:{
					"action": "opensearch",
					"format": "json",
					"search": q,
				},
				error: function(xhr, s, e){
					console.log(xhr);
					console.log(s);
					console.log(e);
				},
				success: that.handler
			});
		}
	};

	WikiInterface.initialize();
	$(document).foundation();

})();