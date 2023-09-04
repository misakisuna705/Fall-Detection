function select_option() {
  const LENGTH = MAIN_BOX_CONTENTS_CONFIG.length;
  const ID = event.target.id;

  dom_map_nthu.style.display = "none";

  for (let i = 0; i < LENGTH; i++) {
    if (SIDEBAR_OPTIONS_CONFIG[i] == ID) {
      dom_main_box_contents[i].style.display = "flex";
    } else {
      dom_main_box_contents[i].style.display = "none";
    }
  }
}
