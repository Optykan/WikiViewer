(function(){
	'use strict';
	
	var WikiInterface={
		results: [],
		last: "",
		animateIn: "fadeIn",
		animateOut: "fadeOut", 
		$template: {},
		initialize: function(){
			var that=this;
			console.log("WikiInterface initialized");
			$("#search").keypress(function(e){
				if(e.which==13){
					that.query(this.value);
				}
			});
			$(".random-side").click(function(){
				if(!$("#container").hasClass("results-showing"))
					window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
			});
			$.ajax({
				method: "GET",
				url: "template.html",
				dataType: "html",
				success: function(data){
					that.$template=$.parseHTML(data);
				}
			});
		},
		display: function(){
			//style the big container
			$("#container").hasClass("results-showing") ? '' : $("#container").addClass("results-showing");
			for(var i in this.results){
				//clone the tempate
				var $current=$(this.$template[1]).clone();
				$current.addClass("animated "+this.animateIn); //animate it 
				$current.find("h1").html(this.results[i].title); //change the title

				//get the snippet if we have one
				$current.find(".small-10.column p").html(this.results[i].snippet ?this.results[i].snippet : 'No preview available' ); 
				
				//change the redirect
				$current.find(".small-2.column a").attr("href", this.results[i].url);

				//append it to the document
				$(".results").append($current);
			}

			console.log("loaded all");
			$(".spinner").removeClass("is-spinning");
			$(".logo").removeClass("is-spinning");
		},
		handler: function(data){
			if(typeof data[1][0]=='undefined'){
				this.results.push({
					"title":"No results found",
					"snippet": "Try being more general with your search term", 
					"url":""
				});
			}else{
				for(var i=0; i<data[1].length; i++){
					this.results.push({
						"title": data[1][i],
						"snippet": data[2][i],
						"url": data[3][i]
					});
				}
			}
			console.log(data);
			this.display();
		},
		cls: function(){
			this.results=[];
			var that=this;
			$(".animated").each(function(){
				$(this).removeClass("animated "+that.animateIn).addClass("animated "+that.animateOut);
				(function(t){
					setTimeout(function(){
						$(t).remove();
					},500)
				})(this);
			});
		},
		query: function(q){
			if(q==this.last)
				return;
			this.cls();
			//query the wikimedia api
			var that=this;
			if(!$(".spinner").hasClass("is-spinning"))
				$(".spinner").addClass("is-spinning");
			if(!$(".logo").hasClass("is-spinning"))
				$(".logo").addClass("is-spinning");
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
					'Api-User-Agent': 'WikiViewer/0.1 || syang0525@gmail.com || Updated: 2016/06/15',
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