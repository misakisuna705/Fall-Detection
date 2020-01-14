function set_danger_statistics_map() {
  const DATABASE = firebase.firestore();
  const GMAP = google.maps;
  const MAP_DANGER_STATISTICS = new GMAP.Map(dom_main_box_contents[2], MAP_CONFIG);
  const RENDERER = new GMAP.DirectionsRenderer({ map: MAP_DANGER_STATISTICS });
  const LENGTH = SAVERS_CONFIG.length;
  const SAVERS = [];

  //setup savers
  for (let i = 0; i < LENGTH; i++) {
    SAVERS[i] = new GMAP.Marker({
      map: MAP_DANGER_STATISTICS,
      title: SAVERS_CONFIG[i].title,
      position: SAVERS_CONFIG[i].position,
      icon: "https://maps.google.com/mapfiles/ms/micons/blue.png"
    });
  }

  //DATABASE.collection("Danger").onSnapshot(querySnapshot => {
  //DATABASE.collection("Danger_GPS")
  //.orderBy("time", "desc")
  //.get()
  //.then(querySnapshot => {
  //querySnapshot.forEach(doc => {
  ////get danger data
  //const DATA = doc.data();

  ////get danger pos
  //LAT = DATA.latitude;
  //LNG = DATA.longtitude;
  //POS = { lat: LAT, lng: LNG };

  ////locate map center
  //const CENTER = new GMAP.LatLng((MAP_CONFIG.center.lat * 3 + LAT) / 4, (MAP_CONFIG.center.lng * 3 + LNG) / 4);

  //MAP_DANGER_STATISTICS.setCenter(CENTER);

  ////display danger marker
  //ARKER = new GMAP.Marker({
  //map: MAP_DANGER_STATISTICS,
  //title: "Danger",
  //position: POS,
  //icon: "https://maps.google.com/mapfiles/ms/micons/red.png"
  //});
  //});
  //})
  //.catch(error => {
  //console.log(error);
  //});
  //});

  DATABASE.collection("Danger_GPS").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      //get danger data
      const DATA = doc.data();

      //get danger pos
      LAT = DATA.latitude;
      LNG = DATA.longtitude;
      POS = { lat: LAT, lng: LNG };

      //locate map center
      //const CENTER = new GMAP.LatLng((MAP_CONFIG.center.lat * 3 + LAT) / 4, (MAP_CONFIG.center.lng * 3 + LNG) / 4);

      //MAP_DANGER_STATISTICS.setCenter(CENTER);

      //display danger marker
      const MARKER = new GMAP.Marker({
        map: MAP_DANGER_STATISTICS,
        title: "Danger",
        position: POS,
        icon: "https://maps.google.com/mapfiles/ms/micons/red.png"
      });
    });
  });
}
