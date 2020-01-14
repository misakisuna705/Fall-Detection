function set_event_detection_map() {
  const DATABASE = firebase.firestore();
  const GMAP = google.maps;
  const MAP_EVENT_DETECTION = new GMAP.Map(dom_main_box_contents[0], MAP_CONFIG);
  const RENDERERS = [];
  const ROUTER = new GMAP.DirectionsService();
  const LENGTH = SAVERS_CONFIG.length;
  const SAVERS = [];
  const ROUTINGS = [];

  //setup savers
  for (let i = 0; i < LENGTH; i++) {
    SAVERS[i] = new GMAP.Marker({
      map: MAP_EVENT_DETECTION,
      title: SAVERS_CONFIG[i].title,
      position: SAVERS_CONFIG[i].position,
      icon: "https://maps.google.com/mapfiles/ms/micons/blue.png"
    });
  }

  let DATA = undefined;
  //let LAT = 24.79438;
  let LAT = undefined;
  //let LNG = 120.99331;
  let LNG = undefined;
  //let POS = { lat: LAT, lng: LNG };
  let POS = undefined;
  let MARKER = undefined;

  //detect warning
  let warning_init = true;

  DATABASE.collection("Warning").onSnapshot(querySnapshot => {
    if (warning_init == false) {
      DATABASE.collection("GPS")
        .orderBy("time", "desc")
        .limit(1)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //get warning gps data
            DATA = doc.data();

            //get warning pos
            LAT = DATA.latitude;
            LNG = DATA.longtitude;
            POS = { lat: LAT, lng: LNG };

            //locate map center
            const CENTER = new GMAP.LatLng((MAP_CONFIG.center.lat * 3 + LAT) / 4, (MAP_CONFIG.center.lng * 3 + LNG) / 4);

            MAP_EVENT_DETECTION.setCenter(CENTER);

            //display warning marker
            if (MARKER != undefined) {
              MARKER.setMap(null);
            }

            MARKER = new GMAP.Marker({
              map: MAP_EVENT_DETECTION,
              title: "Warning",
              position: POS,
              icon: "https://maps.google.com/mapfiles/ms/micons/orange.png"
            });

            DATABASE.collection("Warning_GPS")
              .doc(DATA.time.toString())
              .set(DATA);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    warning_init = false;
  });

  //detect danger
  let danger_init = true;

  DATABASE.collection("Danger").onSnapshot(querySnapshot => {
    if (danger_init == false) {
      //display marker as danger
      MARKER.setIcon("https://maps.google.com/mapfiles/ms/micons/red.png");

      //search path
      parse_path(ROUTINGS, ROUTER, LAT, LNG);

      //setup renderers
      for (let i = 0; i < LENGTH; i++) {
        RENDERERS[i] = new GMAP.DirectionsRenderer({ map: MAP_EVENT_DETECTION });
      }

      //draw path
      Promise.all(ROUTINGS)
        .then(distances => set_renderers(RENDERERS, distances))
        .then(path => set_other_paths(ROUTER, RENDERERS, LAT, LNG, path))
        .then(path => set_shortest_paths(ROUTER, RENDERERS, LAT, LNG, path))
        .then(renderers => reset(DATA, MARKER, renderers))
        .catch(error => console.log(error));

      DATABASE.collection("Danger_GPS")
        .doc(DATA.time.toString())
        .set(DATA);
    }

    danger_init = false;
  });

  //detect cancel
  let cancel_init = true;

  DATABASE.collection("Cancel").onSnapshot(querySnapshot => {
    if (cancel_init == false) {
      reset(DATA, MARKER, RENDERERS);
    }

    cancel_init = false;
  });
}

function parse_path(routings, router, lat, lng) {
  const LENGTH = SAVERS_CONFIG.length;
  const GMAP = google.maps;

  for (let i = 0; i < LENGTH; i++) {
    routings[i] = new Promise((resolve, reject) => {
      router.route(
        {
          origin: SAVERS_CONFIG[i].position,
          destination: { lat: lat, lng: lng },
          travelMode: "WALKING"
        },
        (result, status) => {
          if (status == GMAP.DirectionsStatus.OK) {
            const DISTANCE = get_distance(result, status);

            resolve(DISTANCE);
          } else {
            reject(status);
          }
        }
      );
    });
  }
}

function get_distance(result, status) {
  let distance = 0;

  result.routes[0].legs[0].steps.forEach(segment => {
    distance += segment.distance.value;
  });

  return distance;
}

function set_renderers(renderers, distances) {
  return new Promise(resolve => {
    const LENGTH = SAVERS_CONFIG.length;
    const PATH = distances.indexOf(Math.min.apply(Math, distances));

    for (let i = 0; i < LENGTH; i++) {
      const COLOR = i === PATH ? "Red" : "Blue";

      renderers[i].setOptions({ preserveViewport: true, suppressMarkers: true, polylineOptions: { strokeColor: COLOR } });
    }

    resolve(PATH);
  });
}

function set_other_paths(router, renderers, lat, lng, path) {
  return new Promise(resolve => {
    const LENGTH = SAVERS_CONFIG.length;
    const GMAP = google.maps;

    for (let i = 0; i < LENGTH; i++) {
      if (i != path) {
        router.route(
          {
            origin: SAVERS_CONFIG[i].position,
            destination: { lat: lat, lng: lng },
            travelMode: "WALKING"
          },
          (result, status) => {
            if (status == GMAP.DirectionsStatus.OK) {
              renderers[i].setDirections(result);

              setTimeout(resolve, 300, path);
            } else {
              reject(status);
            }
          }
        );
      }
    }
  });
}

function set_shortest_paths(router, renderers, lat, lng, path) {
  return new Promise(resolve => {
    const LENGTH = SAVERS_CONFIG.length;
    const GMAP = google.maps;

    router.route(
      {
        origin: SAVERS_CONFIG[path].position,
        destination: { lat: lat, lng: lng },
        travelMode: "WALKING"
      },
      (result, status) => {
        if (status == GMAP.DirectionsStatus.OK) {
          renderers[path].setDirections(result);

          setTimeout(resolve, 3000, renderers);
        } else {
          console.log(status);
        }
      }
    );
  });
}

function reset(data, marker, renderers) {
  const DATABASE = firebase.firestore();
  const LENGTH = SAVERS_CONFIG.length;

  if (marker != undefined) {
    marker.setMap(null);
  }

  for (let i = 0; i < LENGTH; i++) {
    if (renderers[i] != undefined) {
      renderers[i].setMap(null);
    }
  }

  DATABASE.collection("Finish")
    .doc(data.time.toString())
    .set(data);
}
