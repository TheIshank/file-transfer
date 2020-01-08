const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path');
const cors = require('cors');

const _port = 5000;
const _app_folder = 'dist/application';
const app = express()

app.use(cors());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    res.send("It works");
})

app.post('/submit-form', (req, res) => {
    let uploadDir = path.join(__dirname, '/uploads');
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
        if (files) {
            Object.keys(files).forEach((file_id) => {
                file = files[file_id]
                fs.rename(file.path, path.join(uploadDir, file.name), function (err) {
                    if (err) {
                        console.log("Error Renaming");
                    }
                    else {
                        console.log("Renamed Successfully");
                    }
                })
            })
            res.status(200).send({"status":200});
            res.end();
        }
    });
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});