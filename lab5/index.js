const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const checkFileExists = () => {
  fs.readFile('public/artist.json', (err, data) => {
    if (err) fs.writeFile('public/artist.json', '[]', (err) => {
      if (err) return;
    })
    try {
      obj = JSON.parse(data);
      console.log(obj);
    } catch (e) {
      fs.writeFile('public/artist.json', '[]', (err) => {
        if (err) return;
      })
    }
  })
}

const saveToFile = (artist, about, url) => {
  fs.readFile('public/artist.json', (err, data) => {
    if (err) fs.writeFile('public/artist.json', '[]', (err) => {
      if (err) return;
    })
    try {
      artistArr = JSON.parse(data);
      artistArr.push({"artist": artist, "about": about, "url": url});
      fs.writeFile('public/artist.json', JSON.stringify(artistArr), (err) => {
        if (err) return;
      })
    } catch (e) {
      console.log(e);
    }
  })
}

const deleteFromFile = (artist, about, url) => {
  fs.readFile('public/artist.json', (err, data) => {
    if (err) return;
    artistArr = JSON.parse(data);
    artistArr.forEach((artistObj, index, arr) => {
      if (artistObj.artist === artist) {
        if (artistObj.about === about) {
          if (artistObj.url === url) {
            arr.splice(index, 1);
            fs.writeFile('public/artist.json', JSON.stringify(arr), (err) => {
              if (err) return;
            })
          }
        }
      }
    })
  })
}
checkFileExists();

app.get('/add', (req, res) => {
  fs.readFile('public/artist.json', (err, data) => {
    if (err) return;
    return res.json(JSON.parse(data));
  })
})

app.post('/add', (req, res) => {
  saveToFile(req.body.artist, req.body.about, req.body.url);
  const data = req.body;
  res.json({
    artist: data.artist,
    about: data.about,
    url: data.url
  })
})

app.post('/delete', (req, res) => {
  deleteFromFile(req.body.artist, req.body.about, req.body.url);
  const data = req.body;
  res.json({
    artist: data.artist,
    about: data.about,
    url: data.url
  })
})

app.get('/search', (req, res) => {
  fs.readFile('public/artist.json', (err, data) => {
    if (err) return;
    return res.json(JSON.parse(data));
  })
})

app.listen(3000, () => console.log("server is ready!"));