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


    return false;
};

$('#form-container').submit(loadData);
