// storage for all map markers created.
var markers = [];
// initilize google maps.
function initMap() {
    //applys the knockout to run in map.
    ko.applyBindings(new AppViewModel());
    // even listener that adjusts center of map
    // if browser resizes.
    google.maps.event.addDomListener(window, 'resize', function () {
        map.setCenter(uluru);
    });
    //creates infowindow for each marker.
    var MarkersInfowindow = new google.maps.InfoWindow();
    //main marker location
    var uluru = {
        lat: 40.7298
        , lng: -73.9767
    };
    //creates map 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
        , center: uluru
    });
    //foursquare clientID & secret
    var clientID = 'LH33HAMSV5DNQWAJQLTNGJBF23EFGHIC0CMC5SMHELD3VA4Y';
    var clientSecret = '4GZY5OVE2NLVEU2GPW2U5KFKCZLXG3YQMRVBZ4ZK5NTF35EQ';
    //end of foursquare credientials.
    
    //for looping markers and placing them on map
    //requests foursquare ulr to get venu and photos
    for (var i = 0; i < places().length; i++) {
        // get JSON request of foursquare data
        var reqURL = 'https://api.foursquare.com/v2/venues/search?ll=' + places()[i].location.lat + ',' + places()[i].location.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20180803' + '&query=' + places()[i].title;
        //after request is done
        $.when($.getJSON(reqURL)).done(function (data1) {
            //getting venue result
            var results = data1.response.venues[0];
            console.log(results);
            //url for foursquare photos
            var photoURL = 'https://api.foursquare.com/v2/venues/' + results.id + '/photos?&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20180803';
            // get JSON request of foursquare photos
            $.getJSON(photoURL, function (photoData) {
                //getting venue photo result
                console.log(results.location.formattedAddress);
                var photos = photoData.response.photos.items["0"].suffix;
                //getting location from foursquare
                var location = {
                    lat: results.location.lat
                    , lng: results.location.lng
                };
                //creating markers using foursquare data.
                //for google maps
                var marker = new google.maps.Marker({
                    position: location
                    , map: map
                    , title: results.name
                    , animation: google.maps.Animation.DROP
                    , id: results.id
                    , url: results.url
                    , categories: results.categories
                    , img:photos
                    ,address: results.location.formattedAddress
                    ,contact: results.contact.formattedPhone
                    
                    
                });
                // creats an event listener.
                //loads infowindow for individual marker.
                marker.addListener('click', function () {
                    populateInfoWindow(this, MarkersInfowindow);
                });
                // places each marker into the markers array.
                markers.push(marker);
            });
            //error handler for foursquare data gathering.
        }).fail(function () {
            alert('foursquare broke');
        });
    }
    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        //url error handler
        function urlerror() {
            if (marker.url) {
                return marker.url;
            }
            else {
                return marker.url('link broken');
            }
        };
        
        //content of my marker infowindow.
        var contentString = '<div id="content" class="text-center text-uppercase"><div id="siteNotice"></div><div id="bodyContent"><p><b>' + marker.title + '</p></b><div class="image">' + '<img src="https://igx.4sqi.net/img/general/300x300'+ marker.img +'" alt="" width="300" height="300">' + '</div>' + '<div><hr><strong>for info:'+marker.contact+'</strong></div><a href="' + urlerror() + '" target="_blank">' + urlerror() + '</div></div>';
        
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(contentString);
            //set bounce animation on clicked marker.
            infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.open(map, marker);
            //zooms in to map when marker clicked
            map.setZoom(16);
            map.getBounds(marker.getPosition());
            //centers map on marker
            //based on getting markers lat/long
            map.setCenter(marker.getPosition());
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
                infowindow.marker.setAnimation(null);
                // zooms out on map when infowindow
                //is closed
                map.setZoom(12);
            });
        }
    }
    //opens infowindow when list is clicked.
    infoList = function (clickedinfo) {
        populateInfoWindow(this, MarkersInfowindow);
    };
}

// knockout view model hold my data of places
function AppViewModel() {
    places = ko.observableArray([
        {
            title: 'Dun-Well Doughnuts'
            , location: {
                lat: 40.707365
                , lng: -73.940256
            }
        }
        , {
            title: 'Empire State Building'
            , location: {
                lat: 40.748817
                , lng: -73.985428
            }
        }
        , {
            title: 'The Spotted Pig'
            , location: {
                lat: 40.7356
                , lng: -74.0067
            }
        }
        , {
            title: 'central park zoo '
            , location: {
                lat: 40.7678
                , lng: -73.9718
            }
        }
        , {
            title: 'Central Park'
            , location: {
                lat: 40.7829
                , lng: -73.9654
            }
        }
        , {
            title: 'times square '
            , location: {
                lat: 40.7589
                , lng: -73.9851
            }
        }


    ]), 
        
    listInput = ko.observable('');
    searchedNames = ko.computed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        var storeInput = listInput().toLowerCase();
        if (!storeInput) {
            ko.utils.arrayForEach(markers, function (item) {
                //  when listInput is blank all markers visible(true)
                item.setVisible(true);
            });
            return markers;
        }
        else {
            return ko.utils.arrayFilter(markers, function (item) {
                // set all markers visible based on result
                var result = (item.title.toLowerCase().search(storeInput) >= 0)
                item.setVisible(result);
                return result;
            });
        }
    });
}
