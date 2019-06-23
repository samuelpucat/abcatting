const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const catsController = require("./api/controllers/catsController");
const voteController = require("./api/controllers/voteController");

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  //TODO: move PW to environment
  const mongoPW = "JcR8DYX65FsjjUpX"
  mongoose.connect("mongodb+srv://readWriteAnuDatabase:" + mongoPW + "@cluster0-a6tpd.mongodb.net/test?retryWrites=true&w=majority");

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/getRandomPair', catsController.getRandomPair);
  app.post('/vote', voteController.vote);
  app.get('/getTotalVotesStats', voteController.getTotalVotesStats);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });
}
