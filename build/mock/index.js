var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var compression = require('compression');
var JsonHelper = require("./json-helper");
var path = require("path");

app.use(bodyParser.json());

//启动GZIP
app.use(compression());

//指定dist为发布的目录，这样运行mock就可以看发版之后的文件了
app.use(express.static('dist'));

var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

var apiRouter = express.Router()

function getDb() {
  return JsonHelper.load('./mock/db.json');
}

function saveDb(data) {
  return JsonHelper.save('./mock/db.json', data);
}

apiRouter.get('/getImage.jpg', function (req, res) {
  res.sendFile(path.normalize(__dirname + '/../../mock/' + req.query.id));
})

apiRouter.get('/getImages', function (req, res) {
  res.json([
    './api/getImage.jpg?id=bg.jpg',
    './api/getImage.jpg?id=bg1.png',
    './api/getImage.jpg?id=bg2.jpg',
    './api/getImage.jpg?id=bg3.jpg',
    './api/getImage.jpg?id=bg4.jpg',
    './api/getImage.jpg?id=bg5.png',
    './api/getImage.jpg?id=image1.jpg',
    './api/getImage.jpg?id=image2.png',
    './api/getImage.jpg?id=image3.png',
    './api/getImage.jpg?id=image4.jpg',
    './api/getImage.jpg?id=image5.jpg',
    './api/getImage.jpg?id=image6.png',
    './api/getImage.jpg?id=image7.png',
    './api/getImage.jpg?id=image8.png'
  ]);
  res.end();
})

apiRouter.get('/getScene', function (req, res) {
  let data = getDb();
  res.json(data.scene.filter(function (scene) {
    return scene.id == req.query.id;
  })[0]);
  res.end();
})


apiRouter.put('/addScene', function (req, res) {
  let data = getDb();
  let index = req.query.index;
  let projectId = req.query.projectId;

  //生成id的哈希表
  let ids = {};
  data.scene.forEach(function (scene) {
    ids[scene.id] = true;
  })

  //生成唯一的id
  let newId = -1;
  do {
    newId++;
  } while (ids[newId]);

  //新建一个场景
  let scene = {
    id: newId,
    name: "场景" + newId,
    projectId: projectId,
    children: []
  }

  //插入到指定的位置
  data.scene.splice(index, 0, scene);

  saveDb(data);
  res.json(scene);
  res.end();
})

apiRouter.put('/copyScene', function (req, res) {
  let data = getDb();
  let id = req.query.id;

  let scene = data.scene.filter(function (scene) {
    return scene.id == id;
  })[0];

  //生成id的哈希表
  let ids = {};
  data.scene.forEach(function (scene) {
    ids[scene.id] = true;
  })

  //生成唯一的id
  let newId = -1;
  do {
    newId++;
  } while (ids[newId]);

  //克隆一个场景,只是id不一样
  let newScene = Object.assign({}, scene);
  newScene.id = newId;
  newScene.name = "场景" + newId;

  //插入到指定的位置
  data.scene.splice(data.scene.indexOf(scene) + 1, 0, newScene);

  saveDb(data);
  res.json(newScene);
  res.end();
})

apiRouter.get('/getProject', function (req, res) {
  let data = getDb();
  let project = data.project.filter(function (project) {
    return project.id == req.query.id;
  })[0];

  project.scenes = data.scene.filter(function (scene) {
    return scene.projectId == req.query.id;
  }).map(function (scene) {
    return {id: scene.id, name: scene.name}
  })

  res.json(project);
  res.end();
})

apiRouter.delete('/deleteScene', function (req, res) {
  let id = req.query.id;
  let data = getDb();

  if (data.scene.length == 1) {
    res.json(false);
    res.end();
    return;
  }

  data.scene.splice(data.scene.findIndex(function (scene) {
    return scene.id == id;
  }), 1);
  saveDb(data);
  res.end();
})


apiRouter.put('/saveScene', function (req, res) {
  let id = req.body.id;
  let data = getDb();

  let scene = data.scene.filter(function (scene) {
    return scene.id == id;
  })[0];

  Object.assign(scene, req.body);

  saveDb(data);
  res.end();
})

apiRouter.post('/changeSceneIndex', function (req, res) {
  let oldIndex = req.query.oldIndex;
  let newIndex = req.query.newIndex;
  let data = getDb();

  let oldScene = data.scene[oldIndex];

  data.scene.splice(oldIndex,1);
  data.scene.splice(newIndex,0,oldScene);

  saveDb(data);
  res.end();
})

apiRouter.put('/changeSceneName', function (req, res) {
  let id = req.query.id;
  let name = req.query.name;
  let data = getDb();

  data.scene.filter(function (scene) {
    return scene.id == id;
  })[0].name = name;

  saveDb(data);
  res.end();
})

app.use('/api', apiRouter)
