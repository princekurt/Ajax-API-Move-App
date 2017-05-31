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
    var src = ("http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $street + ", " +  $city + '').toString();
    console.log(src);

    //var img = $(document.createElement('img'));

    $greeting.text('So, you want to live at ' + $street + ", " + $city + "?");
    $body.append('<img class ="bgimg" src="' + src + '">');
	
	
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
	
    return false;
};

$('#form-container').submit(loadData);
