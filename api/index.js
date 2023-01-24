const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let currentUUID = "";
let oldUUID = "";
let appRunningFirstTime = true;

app.use(cors());

app.get("/api", function (req, res) {
    uuidString();
    res.send("Hello World");
});

app.get("/api/getqrcode", (req, res) => {
    uuidString();
    console.log("Inbound request received");
    return res.status(200).json({
        response: `https://attendify-frontend-1o31.vercel.app/markattendance?id="${currentUUID}"`,
    });
});

app.post("/api/checkqrcode", (req, res) => {
    var status;
    try {
        const queryId = req.body;
        console.log("id");
        console.log(queryId);
        if (queryId["id"] == currentUUID || queryId["id"] == oldUUID) {
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(200).json({ status: "failure" });
        }
    } catch (e) {
        console.error("Error:", e);
        return res.status(200).json({ status: "failure" });
    }

    console.log("Inbound request received");

    // return res.status(200).json({ status: status });

    // res.json({ status });

    // return res.status(200).json({
    //     response: `http://localhost:3000/?id=${currentUUID}`,
    // });
});

const uuidString = () => {
    console.log("uuid function was called");
    if (currentUUID != "") {
        oldUUID = currentUUID;
    }
    currentUUID = uuidv4();
    console.log(currentUUID);
};

//PORT
const port = 4000;

//new

// //Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
    // if(appRunningFirstTime == true) {
    //   uuidString();
    //   appRunningFirstTime = false;
    // }
    // setInterval(() => uuidString(), 8000)
});

module.exports = app;

// const app = require('express')();
// const { v4 } = require('uuid');

// app.get('/api', (req, res) => {
//   const path = `/api/item/${v4()}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

// module.exports = app;
