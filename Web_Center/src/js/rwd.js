function set_rwd() {
  const LENGTH = MAIN_BOX_CONTENTS_CONFIG.length;

  if (document.body.clientWidth < 1024) {
    dom_sidebar_menu.style.display = "none";
    dom_navbar_menu.style.display = "flex";

    for (let i = 0; i < LENGTH; i++) {
      dom_navbar_options[i].id = SIDEBAR_OPTIONS_CONFIG[i];
      dom_sidebar_options[i].id = NAVBAR_OPTIONS_CONFIG[i];
    }
  } else {
    dom_sidebar_menu.style.display = "flex";
    dom_navbar_menu.style.display = "none";

    for (let i = 0; i < LENGTH; i++) {
      dom_navbar_options[i].id = NAVBAR_OPTIONS_CONFIG[i];
      dom_sidebar_options[i].id = SIDEBAR_OPTIONS_CONFIG[i];
    }
  }
}
