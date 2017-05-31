function loadData() {
  console.log("here");
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var $street = $('#street').val();
    var $city = $('#city').val();
    console.log($city);
	
	//Goggle API
    var src = ("http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $street + ", " +  $city + '').toString();
    console.log(src);

    //var img = $(document.createElement('img'));

    $greeting.text('So, you want to live at ' + $street + ", " + $city + "?");
    $body.append('<img class ="bgimg" src="' + src + '">');
	
	//NYT API
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	'api-key': "74259929d1e34e3d99a51280b4e005d3",
	'q': $city
	});
	
	$.getJSON( url, function( data ) {
	  $nytHeaderElem.text("New York Times Articles About " + $city);
	  
	  articles = data.response.docs;
	  for (var i = 0; i < articles.length; i++) {
		  var article = articles[i];
		  $nytElem.append('<li class="article">' +
				'<a href ="'+article.web_url+'">'+article.headline.main+'</a>' +
				'<p>' + article.snippet + '</p>' + '</li>');
	  };
	});
	
	//WikiPedia API
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + $street +
		'&format=json&callback=wikiCallback';
	
	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text("failed to get wikipedia resources");
	}, 8000);
	
	$.ajax({
		url:wikiUrl,
		dataType: "jsonp",
		success: function(response) {
			var articleList = response[1];
			
			for (var i = 0; i <articleList.length; i++) {
				console.log(articleList[i];
				articleStr = articleList[i];
				var url = 'http://en.wikipedia.org/wiki/' + articleStr;
				$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
			};
			
			clearTimeout(wikiRequestTimeout);
		}
	});
    return false;
};

$('#form-container').submit(loadData);
