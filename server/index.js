const express = require('express')
const _ = require('lodash')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const exampleData = require('../data/tracking.json')

app.get('/', (req, res) => {
  // TODO(Task 1): Split tracking data into trip segments for example by using the time property.
  var groupedData = _.groupBy(exampleData, function (data) {
    return data.time.split('T')[0];
  });

  res.send({ length: exampleData.length, data: groupedData });
})

app.get('/location/:when', (req, res) => {
  // TODO(Task 2): Return the tracking data closest to `req.params.when` from `exampleData`.

  var rangeData = _.filter(exampleData, function (data) {
    t1 = new Date(data.time)
    t2 = new Date(req.params.when)

    if (Math.abs(t2 - t1) / (1000) <= 500)
      return data;
  });

  res.send(rangeData);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
