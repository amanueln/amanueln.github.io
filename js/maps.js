// storage for all markers created.
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
        lat: 40.7214
        , lng: -73.9621
    };
    //creates map 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
        , center: uluru
    });
    //for looping markers and placing them on map
    for (var i = 0; i < people().length; i++) {
        var marker = new google.maps.Marker({
            position: people()[i].location
            , map: map
            , title: people()[i].title
            , animation: google.maps.Animation.DROP
        });
        // creats an event listener.
        //loads infowindow for individual marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, MarkersInfowindow);
        });
        // places each marker into the markers array.
        markers.push(marker);
    }
    
    
    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        //look of info winfowindow
        var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' + '<div id="bodyContent">' + '<p><b>' + marker.title + '</b>, also referred to as <b>Ayers Rock</b>, is a large ' + 'sandstone rock formation in the southern part of the ' + 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' + 'south west of the nearest large town, Alice Springs; 450&#160;km ' + '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' + 'features of the Uluru - Kata Tjuta National Park. Uluru is ' + 'sacred to the Pitjantjatjara and Yankunytjatjara, the ' + 'Aboriginal people of the area. It has many springs, waterholes, ' + 'rock caves and ancient paintings. Uluru is listed as a World ' + 'Heritage Site.</p>' + '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' + 'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' + '(last visited June 22, 2009).</p>' + '</div>' + '</div>';
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            //zooms in to map when marker clicked
            map.setZoom(17);
            map.getBounds(marker.getPosition());
            //centers map on marker
            //based on getting markers lat/long
            map.setCenter(marker.getPosition());
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
                // zooms out on map when infowindow
                //is closed
                map.setZoom(12);
            });
        }
    }
}
// knockout view model hold my data of places
function AppViewModel() {
    people = ko.observableArray([
            {
                title: 'Dun-Well Doughnuts'
                , location: {
                    lat: 40.707365
                    , lng: -73.940256
                }
        }
        , {
                title: 'Chelsea Loft'
                , location: {
                    lat: 40.7444883
                    , lng: -73.9949465
                }
        }
        , {
                title: 'Union Square Open Floor Plan'
                , location: {
                    lat: 40.7347062
                    , lng: -73.9895759
                }
        }
        , {
                title: 'East Village Hip Studio'
                , location: {
                    lat: 40.7281777
                    , lng: -73.984377
                }
        }
        , {
                title: 'TriBeCa Artsy Bachelor Pad'
                , location: {
                    lat: 40.7195264
                    , lng: -74.0089934
                }
        }
        , {
                title: 'Chinatown Homey Space'
                , location: {
                    lat: 40.7180628
                    , lng: -73.9961237
                }
        }


    ])
        , listInput = ko.observable('');
    searchedNames = ko.computed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        var storeInput = listInput().toLowerCase();
        if (!storeInput) {
            return ko.utils.arrayFilter(markers, function (item) {
                //  when listInput is blank all markers visible(true)
                var result = (item.title.toLowerCase().search(storeInput) >= 0)
                item.setVisible(result);
                return result;
            });
        }
        else {
            return ko.utils.arrayFilter(markers, function (item) {
                // set all markers visible based on result
                var result = (item.title.toLowerCase().search(storeInput) >= 0)
                item.setVisible(result);
                return result;
            });
        }
    }, this);
};