/* =====================
Lab 1: Turf.js

"Our maps have only interpreted data in various ways; the point is to change it."


In the coming weeks, we'll be looking at ways to explore, analyze, and create data.
This will require us to build upon concepts that we've already mastered. Turf.js is a
javascript library which provides some excellent utilities for fast, in-browser
spatial analysis.

Recall that GeoJSON is a format for representing spatial objects in JSON. It encodes
not only the geometric entities themselves (Points, Lines, Polygons) but also associated
properties (these are the properties of Features) and collections thereof (FeatureGroups).

This is useful for sending spatial data over the wire (we can present these objects in text
since they are JSON). But the predictable structure of a geojson object (there are
infinitely many possible geojson objects, though they all meet the criteria specified
here: http://geojson.org/) also benefits us by offering a structure which our code can
expect.

Consider the functions you've written before: their input has depended on the type
of data they receive. If you write a function which expects an object that has an 'x' and
a 'y' property, you can access those within your function body:

function exampleFunction(someObject) {
  return someObject.x + someObject.y;
}
exampleFunction({x: 1, y: 22}) === 23

Turf leans on the predictable structure of geojson to provide its analytic functions.
Here, Turf lays out the types you can expect to find throughout its documentation:
http://turfjs.org/static/docs/global.html

Let's look to a turf function's docs: http://turfjs.org/static/docs/module-turf_average.html
==================================================================================================
name              - Type                        - Description
==================================================================================================
polygons          - FeatureCollection.<Polygon> - polygons with values on which to average
points            - FeatureCollection.<Point>   - points from which to calculate they average
field             - String                      - the field in the points features from which to
                                                  pull values to average
outputField       - String                      - the field in polygons to put results of the averages
==================================================================================================
Returns           - FeatureCollection.<Polygon> - polygons with the value of outField set to
                                                  the calculated averages
==================================================================================================

What this tells us is that turf.average takes four arguments. The first
argument is a FeatureCollection of Polygons, the second, is a FeatureCollection
of Points, the third and fourth is a bit of text.

With those inputs, a FeatureCollection of polygons is produced which has the average value
of "field" from the points (captured within a spatial join) stored on its properties' field
"outputField".

All of the functionality within turf can be similarly understood by looking to its documentation.
Turf documentation: http://turfjs.org/static/docs/
Turf examples: http://turfjs.org/examples.html


Each exercise in this lab involves the creation of GeoJSON (feel free to use geojson.io) and
the use of that GeoJSON in some turf functions.

NOTE: you can use geojson.io's table view to attach properties to your geometries!*/

/*Exercise 1: Finding the nearest point
Take a look at http://turfjs.org/static/docs/module-turf_nearest.html
Produce a Feature and a FeatureCollection (look to the in-documentation examples if this is
unclear) such that the single Point Feature is in Philadelphia and the nearest point in the
FeatureCollection (there should be at least two other points in this collection) happens
to be in New York City. Plot the NYC point and no others with the use of turf.nearest.*/


  var point = {
  "type": "Feature",
  "properties": {
    "marker-color": "#0f0"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [ -75.16279220581055,39.95435914620152]
  }
};
var against = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [ -73.98880004882812, 40.71551718935035]
      }
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [ -79.56298828125, 43.723474896114816]
      }
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-76.9482421875, 38.70265930723801]
      }
    }
  ]
};

var nearest = turf.nearest(point, against);
console.log(nearest);

L.geoJson(nearest).addTo(map);


/*Exercise 2: Finding the average point value (a form of spatial join)
Docs here: http://turfjs.org/static/docs/module-turf_average.html
Produce one FeatureCollection of points (at least 5) and one of polygons (at least 2)
such that, by applying turf.average, you generate a new set of polygons in which one of
the polygons has the property "averageValue" with a value of 100.*/
var polygons = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [ -75.673828125,39.66491373749131],
          [ -75.673828125, 41.0130657870063],
          [ -73.037109375, 41.0130657870063],
          [ -73.037109375, 39.66491373749131 ],
          [ -75.673828125, 39.66491373749131]
        ]]
      }
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [ -78.848876953125, 38.66835610151509 ],
          [ -78.848876953125, 39.90973623453719 ],
          [ -75.7177734375, 39.90973623453719 ],
          [ -75.7177734375, 38.66835610151509 ],
          [ -78.848876953125,38.66835610151509]
        ]]
      }
    }
  ]
};
var points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ -75.16279220581055, 39.95435914620152]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 600
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.98880004882812, 40.71551718935035]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 100
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ -76.9482421875, 38.70265930723801]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.849609375, 41.07935114946899]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 300
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-76.904296875, 40.41349604970198]
      }
    }
  ]
};

var averaged = turf.average(
 polygons, points, 'population', 'pop_avg');


L.geoJson(averaged).addTo(map);

L.geoJson(points).addTo(map);

L.geoJson(averaged, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.pop_avg.toString() );
    }
}).addTo(map);








/*Exercise 3: Tagging points according to their locations
http://turfjs.org/static/docs/module-turf_tag.html
It can be quite useful to 'tag' points in terms of their being within this or that
polygon. You might, for instance, want to color markers which represent dumpsters
according to the day that trash is picked up in that area. Create three polygons
and use properties on those polygons to color 5 points.*/


// create a triangular grid of polygons


/*var both = turf.featurecollection(
  triangleGrid.features.concat(randomPoints.features));*/

  var cityPoints = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.95996093749999,
          40.713955826286046
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.201416015625,
          39.98553841480972
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.981201171875,
          38.8225909761771
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.860595703125,
          41.347948493443546
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.89306640625,
          40.77638178482896
        ]
      }
    }
  ]};
  var thrPolygons = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {'fill': '#a02',
       "fill-opacity": 1},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -76.453857421875,
              41.45919537950706
            ],
            [
              -75.82763671875,
              40.93011520598305
            ],
            [
              -74.652099609375,
              41.16211393939692
            ],
            [
              -74.68505859374999,
              41.97582726102573
            ],
            [
              -76.04736328125,
              42.204107493733176
            ],
            [
              -76.453857421875,
              41.45919537950706
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {'fill': '#7f5',
    "fill-opacity": 1},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.2783203125,
              40.82212357516945
            ],
            [
              -75.78369140625,
              40.04443758460859
            ],
            [
              -74.959716796875,
              39.5633531658293
            ],
            [
              -73.729248046875,
              40.04443758460859
            ],
            [
              -73.45458984375,
              41.1290213474951
            ],
            [
              -75.2783203125,
              40.82212357516945
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {'fill': '#f76',
         "fill-opacity": 1 },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -78.475341796875,
              41.20345619205129
            ],
            [
              -76.81640625,
              41.269549502842565
            ],
            [
              -75.992431640625,
              40.6723059714534
            ],
            [
              -76.497802734375,
              38.90813299596705
            ],
            [
              -78.1787109375,
              38.41055825094609
            ],
            [
              -79.47509765625,
              40.153686857794035
            ],
            [
              -78.475341796875,
              41.20345619205129
            ]
          ]
        ]
      }
    }
  ]
};



  var tagged = turf.tag(cityPoints, thrPolygons, 'fill', 'marker-color');

/*turf cannnot take in leaflet, so please put the turf function before, use leaflet function as last as possible*/
L.geoJson(tagged, {
  pointToLayer: function (feature, tagged) {
    return L.circleMarker(tagged);
  },
  style: function (feature) {
    return {color: feature.properties['marker-color']};
  }
}).addTo(map);

/*  L.geoJson(tagged).addTo(map);*/
/*L.geoJson(thrPolygons).addTo(map);*/



/*var tagged = turf.tag(([-75.16279220581055, 39.95435914620152],[-73.98880004882812, 40.71551718935035],[-76.904296875, 40.41349604970198],[-76.9482421875, 38.70265930723801],[-75.849609375,41.07935114946899]), triangleGrid,
                      'fill', 'marker-color');*/




/*STRETCH GOAL*
Exercise 4: Calculating a destination
A species of bird we're studying is said to travel in a straight line for 500km
during a migration before needing to rest. One bird in a flock we want to track
has a GPS tag which seems to be on the fritz. We know for a fact that it started
flying from [-87.4072265625, 38.376115424036016] and that its last known coordinate
was [-87.5830078125, 38.23818011979866]. Given this information, see if you can
determine where we can expect this flock of birds to rest.
===================== */
