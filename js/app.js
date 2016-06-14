//don't pollute the global namespace
(function(){
	'use strict';
	
	var WikiInterface={
		results: [],
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
			for(let i=0; i<data[1].length; i++){
				this.results.push({
					"title": data[1][i],
					"snippet": data[2][i],
					"url": data[3][i]
				});
			}
			console.log(this.results);
		},
		query: function(q){
			var that=this;
			$.ajax({
				method: "GET",
				url: "https://en.wikipedia.org/w/api.php",
				dataType: "jsonp",
				data:{
					"action": "opensearch",
					"format": "json",
					"search": q,
				},
				headers: {
					'Api-User-Agent': 'WikiViewer/0.1',
					'Accept': 'application/json'
				},
				error: function(xhr, s, e){
					console.log("An error occurred.");
				},
				success: that.handler.bind(that) //bind the context of the handler to the WikiViewer object, not the ajax object
			});
		}
	};

	WikiInterface.initialize();
	$(document).foundation();

})();