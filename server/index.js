// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// let events = [];
// const studio = {
//   id: "98d14153-843f-4f0e-8a93-4f2ea921f5d8",
//   delay: 17,
//   type: {
//     id: "0e1c09a3-516b-4482-8b0c-474c62620cf2",
//     title: "Studio d'enregistrement",
//     title_en: "Recording Studio",
//     title_fr: "Studio d'enregistrement",
//     fee: 0.1,
//     created_at: "2019-07-08T06:41:55.114000Z",
//     updated_at: "2020-01-24T11:27:16.774957Z",
//   },
//   min_price: [{ price: 20, unity: 1, mode: "hour", service_id: "03c4c32f-7d40-46e6-a1d4-adb4c5c617cf" }],
//   created_at: "2020-01-08T11:14:24.608285Z",
//   updated_at: "2020-01-28T16:59:15.108481Z",
//   slug: "wish-music-studio-equipe-sans-ingenieur-son-lile-saint-denis-93450-ile-de-france",
//   name: "WISH MUSIC - STUDIO EQUIPE SANS ING\u00c9NIEUR SON",
//   description: "Situ\u00e9 \u00e0 l'\u00eele Saint Denis, Venez composer, mixer, enregistrer au studio Wish Music.",
//   latitude: 48.9374552,
//   longitude: 2.33776590000002,
//   capacity: 5,
//   published: true,
//   has_engineer: true,
//   is_forward: false,
//   use_vat: false,
//   calendar_id: null,
//   timezone: "Europe/Paris",
//   user: "4cbbe0b5-4efc-4e74-bede-84f7c5629d5e",
// };

// // get all todos
// app.put("/studios/:id", (req, res) => {
//   studio.calendar_id = req.body["name"];
//   events = [];
//   res.status(200).send(studio);
// });

// // get all todos
// app.put("/bookings/calendar", (req, res) => {
//   events = req.body;
//   res.status(200).send(events);
// });

// // get all todos
// app.get("/bookings", (req, res) => {
//   res.status(200).send(events);
// });



// const PORT = 7000;

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });
