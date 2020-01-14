let dom_sidebar_menu;
let dom_navbar_menu;
let dom_map_nthu;

let dom_navbar_options = [];
let dom_sidebar_options = [];
let dom_main_box_contents = [];

function get_dom() {
  const LENGTH = MAIN_BOX_CONTENTS_CONFIG.length;

  dom_sidebar_menu = document.getElementById("sidebar_menu");
  dom_navbar_menu = document.getElementById("navbar_menu");
  dom_map_nthu = document.getElementById("map_nthu");

  for (let i = 0; i < LENGTH; i++) {
    dom_navbar_options[i] = document.getElementById(NAVBAR_OPTIONS_CONFIG[i]);
    dom_sidebar_options[i] = document.getElementById(SIDEBAR_OPTIONS_CONFIG[i]);
    dom_main_box_contents[i] = document.getElementById(MAIN_BOX_CONTENTS_CONFIG[i]);
  }
}
