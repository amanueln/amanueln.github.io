#Project: Neighborhood Map
A single-page application featuring a map of your neighborhood or a neighborhood you would like to visit or have others visit.
You will then add additional functionality to this application, including: map markers to identify popular 
locations or places you’d like to visit,Knockout is used to handle the list, filter, and any other information on the page that is subject to changing state..You will then research and implement third-party APIs 
that provide additional information about each of these locations (such as StreetView images, Wikipedia 
articles, Yelp reviews, etc).

Features and libraries :
  - HTML5
  - CSS3
  - jQuery
  - Bootstrap 3
  - knockout.js
  - CSS and jQuery animations
  - Compatible Browsers :
    - IE, Firefox, Safari, Opera, Chrome

### Live Demo
[Live Demo](https://amanueln.github.io/)

### Installation
  - Unzip the file and run the index.html
  - Enter a place so that you can filter the list of places
  - By clicking on the markers or list items, the information of the place will be displayed.
  - There is an event listener which centers the map based on the selected pin so it would help a lot on small displays.
  - By clicking on the infowindow exit button, you will be zoomed back out to see all the markers. if you have typed the marker you want     only that marker will still be shown when zoomed out. 
  
  
### material source
[Twitter Bootstrap]: (http://twitter.github.com/bootstrap/)
[knockout.js]: (http://knockoutjs.com/)
[jQuery]: (http://jquery.com)

This map uses Google Maps API needs Key/Authentication you may need to use your own key.
For getting a key visit :
https://developers.google.com/maps/documentation/javascript/get-api-key

In the index.html, you are able to change the api key:
```js
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" type="text/javascript" async defer></script>
```

This infowindow shows you current data from the foursquare Api. due to limitation on the amount of requests. getting your own key is advisible.
for getting started:
https://developer.foursquare.com/docs/api/getting-started
```  foursquare clientID & secret**/
    var clientID = 'LH33HAMSV5DNQWAJQLTNGJBF23EFGHIC0CMC5SMHELD3VA4Y';
    var clientSecret = '4GZY5OVE2NLVEU2GPW2U5KFKCZLXG3YQMRVBZ4ZK5NTF35EQ';```



