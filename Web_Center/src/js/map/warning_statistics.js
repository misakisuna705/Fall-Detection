function set_warning_statistics_map() {
  const DATABASE = firebase.firestore();
  const GMAP = google.maps;
  const MAP_WARNING_STATISTICS = new GMAP.Map(dom_main_box_contents[1], MAP_CONFIG);
  const RENDERER = new GMAP.DirectionsRenderer({ map: MAP_WARNING_STATISTICS });
  const LENGTH = SAVERS_CONFIG.length;
  const SAVERS = [];

  //setup savers
  for (let i = 0; i < LENGTH; i++) {
    SAVERS[i] = new GMAP.Marker({
      map: MAP_WARNING_STATISTICS,
      title: SAVERS_CONFIG[i].title,
      position: SAVERS_CONFIG[i].position,
      icon: "https://maps.google.com/mapfiles/ms/micons/blue.png"
    });
  }

  //DATABASE.collection("Warning").onSnapshot(querySnapshot => {
  //DATABASE.collection("Warning_GPS")
  //.orderBy("time", "desc")
  //.get()
  //.then(querySnapshot => {
  //querySnapshot.forEach(doc => {
  ////get warning data
  //const DATA = doc.data();

  ////get warning pos
  //LAT = DATA.latitude;
  //LNG = DATA.longtitude;
  //POS = { lat: LAT, lng: LNG };

  ////locate map center
  //const CENTER = new GMAP.LatLng((MAP_CONFIG.center.lat * 3 + LAT) / 4, (MAP_CONFIG.center.lng * 3 + LNG) / 4);

  //MAP_WARNING_STATISTICS.setCenter(CENTER);

  ////display warning marker
  //ARKER = new GMAP.Marker({
  //map: MAP_WARNING_STATISTICS,
  //title: "Warning",
  //position: POS,
  //icon: "https://maps.google.com/mapfiles/ms/micons/orange.png"
  //});
  //});
  //})
  //.catch(error => {
  //console.log(error);
  //});
  //});

  //

  DATABASE.collection("Warning_GPS").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      //get warning data
      const DATA = doc.data();

      //get warning pos
      LAT = DATA.latitude;
      LNG = DATA.longtitude;
      POS = { lat: LAT, lng: LNG };

      //locate map center
      //const CENTER = new GMAP.LatLng((MAP_CONFIG.center.lat * 3 + LAT) / 4, (MAP_CONFIG.center.lng * 3 + LNG) / 4);

      //MAP_WARNING_STATISTICS.setCenter(CENTER);

      //display warning marker
      const MARKER = new GMAP.Marker({
        map: MAP_WARNING_STATISTICS,
        title: "Warning",
        position: POS,
        icon: "https://maps.google.com/mapfiles/ms/micons/orange.png"
      });
    });
  });
}
