
mapboxgl.accessToken = MapToken;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style : "mapbox://styles/mapbox/dark-v11",
      center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
  });
   
    console.log(coordinates);
  
    // const marker = new mapboxgl.Marker({ color:"Red"})
    // .setLngLat(coordinates)
    // .setPopup(new mapboxgl.Popup({offset: 25})
    // .setHTML("<h4>Exact Location Provided by Booking!</h4>")
    // .setMaxWidth("300px"))
    // .addTo(map);

    map.on('load', () => {
      // Load an image from an external URL.
      map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
          (error, image) => {
              if (error) throw error;

              // Add the image to the map style.
              map.addImage('cat', image);
              map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': (coordinates)
                            }
                        }
                    ]
                }
            });
            map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'point', // reference the data source
              'layout': {
                  'icon-image': 'cat', // reference the image
                  'icon-size': 0.25
              }
          });
      }
  );
});

