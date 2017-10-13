var express = require('express')
var fs = require('fs')

module.exports = function (app) {
  var apiRouter = express.Router()

  apiRouter.get('/getImage.jpg', function (req, res) {
    fs.readFile('./mock/' + req.query.id, 'binary', function (err, file) {
      if(err){
        console.error(err);
        return;
      }
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.write(file, 'binary');
      res.end();
    });
  })

  apiRouter.get('/getImages', function (req, res) {
    res.json([
      './mock/getImage.jpg?id=bg.jpg',
      './mock/getImage.jpg?id=bg1.png',
      './mock/getImage.jpg?id=bg2.jpg',
      './mock/getImage.jpg?id=bg3.jpg',
      './mock/getImage.jpg?id=bg4.jpg',
      './mock/getImage.jpg?id=bg5.png',
      './mock/getImage.jpg?id=image1.jpg',
      './mock/getImage.jpg?id=image2.png',
      './mock/getImage.jpg?id=image3.png',
      './mock/getImage.jpg?id=image4.jpg',
      './mock/getImage.jpg?id=image5.jpg',
      './mock/getImage.jpg?id=image6.png',
      './mock/getImage.jpg?id=image7.png',
      './mock/getImage.jpg?id=image8.png'
    ]);
    res.end();
  })

  apiRouter.get('/getScene', function (req, res) {
    res.json(JSON.parse(fs.readFileSync('./mock/scene.json')));
    res.end();
  })
  app.use('/mock', apiRouter)
}
