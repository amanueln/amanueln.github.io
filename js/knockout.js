function AppViewModel() {
    var self = this;
    self.people = ko.observableArray([
        {
            title: 'Dun-Well Doughnuts'
            , position: {
                lat: 40.709942
                , lng: -73.993687
            }
        }
        , {
            title: 'Charles'
            , position: {
                lat: 34.6895
                , lng: 179.6917
            }
        }
        , {
            title: 'Denise'
            , position: {
                lat: 36.6895
                , lng: 139.6917
            }
        }
    ]);
    var saveMarker = [];
    self.placeMarkers = function () {
        var i = 0;
        for (i; i < self.people.length; i++) {
            var test = 'john'
            saveMarker.push(test)
            console.log(saveMarker);
        }
    }
    console.log(saveMarker);
}
ko.applyBindings(new AppViewModel());