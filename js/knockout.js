function AppViewModel() {
    people = ko.observableArray([
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
    var saveMarker = ['test', 'test1', 'test2'];
    var putMarker = [];
    for (var i = 0; i < people().length; i++) {
        saveMarker.push(people()[i]);
        
        console.log(people()[i]);
    }
   console.log('put me here :' + saveMarker);
}
ko.applyBindings(new AppViewModel());