function set_rwd(){const _=MAIN_BOX_CONTENTS_CONFIG.length;if(document.body.clientWidth<1024){dom_sidebar_menu.style.display="none",dom_navbar_menu.style.display="flex";for(let d=0;d<_;d++)dom_navbar_options[d].id=SIDEBAR_OPTIONS_CONFIG[d],dom_sidebar_options[d].id=NAVBAR_OPTIONS_CONFIG[d]}else{dom_sidebar_menu.style.display="flex",dom_navbar_menu.style.display="none";for(let d=0;d<_;d++)dom_navbar_options[d].id=NAVBAR_OPTIONS_CONFIG[d],dom_sidebar_options[d].id=SIDEBAR_OPTIONS_CONFIG[d]}}