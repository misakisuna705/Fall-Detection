#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const MQTT = require("mqtt");
const FIREBASE_ADMIN = require("firebase-admin");

program
  .option("--host <url>", "MQTT broker url")
  .option("--username <username>", "MQTT broker username")
  .option("--password <password>", "MQTT broker password")
  .option("--firebase <path>", "Firebase Admin SDK")
  .option("--topics <list>", "list of comma seperated topics")
  .action(cmd => {
    const { host, username, password, firebase, topics } = cmd;

    if (!(host && username && password && firebase && topics)) {
      console.error("flag undefined");
      process.exit(1);
    }

    const CERTIFICATE = require(path.resolve(process.cwd(), firebase));

    FIREBASE_ADMIN.initializeApp({ credential: FIREBASE_ADMIN.credential.cert(CERTIFICATE) });

    const FIRESTORE = FIREBASE_ADMIN.firestore();

    const CLIENT = MQTT.connect(host, { username, password });

    CLIENT.on("connect", () => {
      console.log(`\n[log] connected to ${host}\n`);

      topics.split(",").forEach(tpc => {
        CLIENT.subscribe(tpc);
      });
    });

    CLIENT.on("message", (tpc, msg) => {
      const MESSAGE = JSON.parse(msg.toString());
      const DATE = new Date(Date.parse(MESSAGE[0].time) - 28800000);
      const TIME = DATE.toISOString();
      const FLAG = MESSAGE[0].data.substring(2, 4);
      const TEMPERATURE = FLAG === "67" ? parseInt(MESSAGE[0].data.substring(5, 8), 16) * 0.1 : null;
      const HUMIDITY = FLAG === "67" ? parseInt(MESSAGE[0].data.substring(13, 14), 16) * 0.5 : null;
      const BAROMETER = FLAG === "67" ? parseInt(MESSAGE[0].data.substring(19, 22), 16) * 0.1 : null;
      const ACC_X = FLAG === "71" ? parseInt(MESSAGE[0].data.substring(5, 8), 16) * 0.001 : null;
      const ACC_Y = FLAG === "71" ? parseInt(MESSAGE[0].data.substring(9, 12), 16) * 0.001 : null;
      const ACC_Z = FLAG === "71" ? parseInt(MESSAGE[0].data.substring(13, 16), 16) * 0.001 : null;
      const LATITUDE = FLAG === "88" ? parseInt(MESSAGE[0].data.substring(5, 12), 16) * 0.0000001 : null;
      const LONGTITUDE = FLAG === "88" ? parseInt(MESSAGE[0].data.substring(12, 20), 16) * 0.0000001 : null;

      const INFO = {
        topic: tpc,
        macaddr: MESSAGE[0].macAddr,
        time: TIME,
        data: MESSAGE[0].data,
        temperature: TEMPERATURE,
        humidity: HUMIDITY,
        barometer: BAROMETER,
        acc_x: ACC_X,
        acc_y: ACC_Y,
        acc_z: ACC_Z,
        latitude: LATITUDE,
        longtitude: LONGTITUDE
      };

      if (INFO.macaddr === "00000000aa44e7b3") {
        console.log(INFO);
        console.log("\n");

        if (INFO.acc_x != null && INFO.acc_y != null && INFO.acc_z != null) {
          FIRESTORE.collection("Warning")
            .doc(TIME.toString())
            .set(INFO);
        } else if (INFO.temperature != null && INFO.humidity != null && INFO.barometer != null) {
          FIRESTORE.collection("Weather")
            .doc(TIME.toString())
            .set(INFO);
        } else if (INFO.latitude != null && INFO.longtitude != null) {
          INFO.latitude = Math.random() * (24.79591 - 24.78699) + 24.78699;
          INFO.longtitude = Math.random() * (120.99535 - 120.9897) + 120.9897;

          FIRESTORE.collection("GPS")
            .doc(TIME.toString())
            .set(INFO);
        } else {
        }
      }
    });

    CLIENT.on("close", () => {
      console.log(`\n[log] disconnected from ${host}\n`);
    });
  })
  .parse(process.argv);
