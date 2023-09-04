function set_maps() {
  //const DATABASE = firebase.firestore();
  const GMAP = google.maps;
  const MAP_NTHU = new GMAP.Map(dom_map_nthu, MAP_CONFIG);
  const LENGTH = SAVERS_CONFIG.length;
  const SAVERS = [];

  //setup savers
  for (let i = 0; i < LENGTH; i++) {
    SAVERS[i] = new GMAP.Marker({
      map: MAP_NTHU,
      title: SAVERS_CONFIG[i].title,
      position: SAVERS_CONFIG[i].position,
      icon: "https://maps.google.com/mapfiles/ms/micons/blue.png"
    });
  }

  //todo
  //const MAPS = [];

  set_event_detection_map();
  set_warning_statistics_map();
  set_danger_statistics_map();
}
