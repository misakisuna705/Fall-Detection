firebase.initializeApp(FIREBASE_CONFIG);

window.addEventListener(
  "DOMContentLoaded",
  () => {
    get_dom();
    set_rwd();
    set_maps();

    window.addEventListener("resize", set_rwd, false);
    dom_navbar_menu.addEventListener("click", select_option, false);
    dom_sidebar_menu.addEventListener("click", select_option, false);
  },
  false
);
