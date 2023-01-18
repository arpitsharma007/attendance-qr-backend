// const express = require('express');
// const app = express();
// const { v4: uuidv4 } = require('uuid');
// var cors = require('cors');

// let currentUUID = "";
// let oldUUID = "";
// let appRunningFirstTime = true;

// app.use(cors())

// app.get('/', function (req, res) {
//     uuidString();
//   res.send('Hello World');
// })

// app.get('/getqrcode', (req, res) => {
//   console.log("Inbound request received");
//     return res.status(200).json({
//         response: `http://localhost:8080/?link=${currentUUID}`
//     });
// })

// const uuidString = () => {
//     console.log("uuid function was called");
//     if(currentUUID != "") {
//         oldUUID = currentUUID;
//     }
//     currentUUID = uuidv4();
//     console.log(currentUUID);
// }

// //PORT
// const port = 4000;

// // //Starting a server
// // app.listen(port, () => {
// //   console.log(`app is running at ${port}`);
// //   if(appRunningFirstTime == true) {
// //     uuidString();
// //     appRunningFirstTime = false;
// //   }
// //   setInterval(() => uuidString(), 8000)
// // });

// module.exports = app;


const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
