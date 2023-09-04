const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDPqqCNoBOwPOrGtKK-6d8LM8fLwrfSheg",
  authDomain: "fall-detection-misakisuna.firebaseapp.com",
  databaseURL: "https://fall-detection-misakisuna.firebaseio.com",
  projectId: "fall-detection-misakisuna",
  storageBucket: "fall-detection-misakisuna.appspot.com",
  messagingSenderId: "540848496258",
  appId: "1:540848496258:web:e4f5d989c596cee97c5e9b",
  measurementId: "G-DNMDMSHEQ1"
};

const NAVBAR_OPTIONS_CONFIG = ["navbar_event_detection", "navbar_warning_statistics", "navbar_danger_statistics"];

const SIDEBAR_OPTIONS_CONFIG = ["sidebar_event_detection", "sidebar_warning_statistics", "sidebar_danger_statistics"];

const MAIN_BOX_CONTENTS_CONFIG = ["map_event_detection", "map_warning_statistics", "map_danger_statistics"];

const MAP_CONFIG = {
  zoom: 16,
  center: { lat: 24.79438, lng: 120.99331 },
  scaleControl: true,
  scrollwheel: false,
  streetViewControl: true
};

const SAVERS_CONFIG = [
  { title: "衛保組", position: { lat: 24.79625, lng: 120.99431 } },
  { title: "駐警隊", position: { lat: 24.79169, lng: 120.99168 } },
  { title: "軍訓室", position: { lat: 24.7925, lng: 120.99394 } }
];
