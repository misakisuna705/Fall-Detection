function set_warning_statistics_map(){const n=firebase.firestore(),o=google.maps,t=new o.Map(dom_main_box_contents[1],MAP_CONFIG),e=(new o.DirectionsRenderer({map:t}),SAVERS_CONFIG.length),i=[];for(let n=0;n<e;n++)i[n]=new o.Marker({map:t,title:SAVERS_CONFIG[n].title,position:SAVERS_CONFIG[n].position,icon:"https://maps.google.com/mapfiles/ms/micons/blue.png"});n.collection("Warning_GPS").onSnapshot(n=>{n.forEach(n=>{const e=n.data();LAT=e.latitude,LNG=e.longtitude,POS={lat:LAT,lng:LNG};new o.Marker({map:t,title:"Warning",position:POS,icon:"https://maps.google.com/mapfiles/ms/micons/orange.png"})})})}