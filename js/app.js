
// initilize google maps.
function initMap() { 
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1) {
            alert('Script Error: See Browser Console for Detail');
        }
        else {
            var message = [
            'Message: ' + msg, 
            'Line: ' + lineNo, 
            'Column: ' + columnNo, 
            ].join(' - ');
            //        alert(message);
            document.getElementById("alert").innerHTML = message;
        }
        return false;
    };
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
        lat: 40.7298, 
        lng: -73.9767
    };
    //creates map 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12, 
        center: uluru
    });
    
    /**Foursquare start
    foursquare clientID & secret**/
    var clientID = 'LH33HAMSV5DNQWAJQLTNGJBF23EFGHIC0CMC5SMHELD3VA4Y';
    var clientSecret = '4GZY5OVE2NLVEU2GPW2U5KFKCZLXG3YQMRVBZ4ZK5NTF35EQ';
    //end of foursquare credientials.
    //for looping markers and placing them on map
    //requests foursquare ulr to get venu and photos
    function loadJson() {
        // get JSON request of foursquare data
        var reqURL = `https://api.foursquare.com/v2/venues/search?ll=${place.location.lng }&client_id=${clientID}&client_secret=${clientSecret}&v=20180803&query=${place.title}`;
        //after request is done
        $.when($.getJSON(reqURL)).done(function (data1) {
            //getting venue result
            //collect venuid 
            var results = data1.response.venues[0];
            //url for foursquare marker info
            var infoURL = 'https://api.foursquare.com/v2/venues/' + results.id + '?&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20180803';
            // get JSON request of foursquare venu info
            $.when($.getJSON(infoURL)).done(function (infoData) {
                //foursquare request info
                var info = infoData;
                //venu photo
                var photos = info.response.venue.bestPhoto.suffix;
                //getting location from foursquare
                var location = {
                    lat: results.location.lat
                    , lng: results.location.lng
                };
                /*creating markers using foursquare data.
                for google maps*/
                var marker = new google.maps.Marker({
                    position: location
                    , map: map
                    , title: results.name
                    , description: info.response.venue.description
                    , animation: google.maps.Animation.DROP
                    , id: results.id
                    , url: info.response.venue.url
                    , categories: info.response.venue.categories["0"]
                    , img: photos
                    , address: results.location.formattedAddress
                    , contact: info.response.venue.contact.formattedPhone
                    , hours: info.response.venue.hours.status
                    , rating: info.response.venue.rating
                    , ratingColor: info.response.venue.ratingColor
                });
                /*creats an event listener.
                loads infowindow for individual marker.
                */
                marker.addListener('click', function () {
                    populateInfoWindow(this, MarkersInfowindow);
                });
                // places each marker into the markers array.
                markers.push(marker);
            });
            //error handler for foursquare data gathering.
        }).fail(function () {
            $().alert('FOURSQUARE BROKE: ISSUE WITH API REQUEST')
                //alert('FOURSQUARE BROKE: ISSUE WITH API REQUEST');
        });
    }
    for (place of places) {
        loadJson(place);
    }
    //Foursquare End
     
    /*This function populates the infowindow when the marker is clicked. We'll only allow
     one infowindow which will open at the marker that is clicked, and populate based
     on that markers position.*/
    function populateInfoWindow(marker, infowindow) {
        //contents of my marker infowindow.
        var contentString = `'<div id="content" class="text-center text-uppercase"><div id="siteNotice"></div><div id="bodyContent"><h4><b " onerror="titleError()"> ${marker.title} </h4></b><div id="venueImg" class="image"> <img src="https://igx.4sqi.net/img/general/300x300${marker.img}" onerror="imageError()"  alt=""' </div><div><hr><p>Venue hours:</p><h5>${marker.hours}</h5></div><div><br><p>Rated:</p><h5><font color="${marker.ratingColor}">${marker.rating}</font>/10</h5><hr></div><div><p>for more information visit:</p></div><a href=" ${marker.url}"target="_blank">${marker.url}</div></div>`;
        // Check to make sure the infowindow is not already opened on this marker.
        if (marker) {
            infowindow.marker = marker;
            infowindow.setContent(contentString);
            //set bounce animation on clicked marker.
             map.getBounds(infowindow.marker.getPosition());
            infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ infowindow.marker.setAnimation(null); }, 1400);
            infowindow.open(map, marker);
            //zooms in to map when marker clicked
            map.setZoom(16);
            /*centers map on marker
            based on getting markers lat/long*/
            map.setCenter(infowindow.marker.getPosition());
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
                infowindow.marker.setAnimation(null);
                // zooms out on map when infowindow
                //is closed
                map.setZoom(12);
            });
            //if filter textarea is clicked infowindow closes 
            document.getElementById("input").addEventListener("click", function(){ 
            if (infowindow !== null) { 
                infowindow.close(); 
                map.setZoom(12);
                  } 
            });
                }
    }
    //opens infowindow when list is clicked.
    infoList = function (clickedinfo) {
        populateInfoWindow(this, MarkersInfowindow);
        /* Set the width of the side navigation to 0 */
        document.getElementById("mySidenav").style.width = "0";
    };
}


//array with my location data
places =[
        {
            title: 'Dun-Well Doughnuts', 
            location: {
                lat: 40.707365, 
                lng: -73.940256
            }
        }, 
        {
            title: 'Empire State Building', 
            location: {
                lat: 40.748817, 
                lng: -73.985428
            }
        }, 
        {
            title: 'The Spotted Pig', 
            location: {
                lat: 40.7356, 
                lng: -74.0067
            }
        }, 
        {
            title: 'central park zoo ', 
            location: {
                lat: 40.7678, 
                lng: -73.9718
            }
        }, 
        {
            title: 'Central Park', 
            location: {
                lat: 40.7829, 
                lng: -73.9654
            }
        }, 
        {
            title: 'times square', 
            location: {
                lat: 40.7589, 
                lng: -73.9851
            }
        }, 
        {
            title: 'Museum of Modern Art', 
            location: {
                lat: 40.7614, 
                lng: -73.9776
            }
        }


    ];
// storage for all map markers created.
var markers = ko.observableArray();
// knockout view model.
function AppViewModel() {
    //stores/tracks user input    
    listInput = ko.observable(''),
    //takes user input and filters marker/list
    searchedNames = ko.computed(function () {
        // lowercase user input
        var storeInput = listInput().toLowerCase();
        //if false show all
        if (!storeInput) {
            ko.utils.arrayForEach(markers(), function (item) {
                //  when listInput is blank all markers visible(true)
                item.setVisible(true);
            });
            return markers();
        }
        // set all markers visible based on result 
        else {
            return ko.utils.arrayFilter(markers(), function (item) {
                // takes user input and filters
                var result = (item.title.toLowerCase().search(storeInput) >= 0);
                item.setVisible(result);
                return result;
            });
        }
    });
}
