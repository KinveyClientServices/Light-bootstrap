const sdk = require('kinvey-flex-sdk');
const _ = require('underscore');
const moment = require('moment');

function ratingCharts(req, complete, modules) {
  const result = req.body;

  var smile = 0;
  var meh = 0;
  var frown = 0;
  var total = 0;
  var resp = {};

  let promises = req.body.map(rating => {
    total = rating.size;

    if (rating.rating === 1) {
      smile++;
    }
    if (rating.rating === 2) {
      meh++;
    }
    if (rating.rating === 3) {
      frown++;
    }
    total = frown + smile + meh;
    resp = {
      stats: {
        smile: smile,
        smilePercent: ((smile / total) * 100).toFixed(0) + '%',
        smileNum: ((smile / total) * 100).toFixed(0),
        meh: meh,
        mehPercent: ((meh / total) * 100).toFixed(0) + '%',
        mehNum: ((meh / total) * 100).toFixed(0),
        frown: frown,
        frownPercent: ((frown / total) * 100).toFixed(0) + '%',
        frownNum: ((frown / total) * 100).toFixed(0),
        total: total
      }
    };
    return rating;
  });

  Promise.all(promises)
    .then(rating => {
      rating.push(resp);
      return rating;
    })
    .then(rating => {
      complete()
        .setBody(rating)
        .ok()
        .next();
    })
    .catch(err => console.log(err));
}

sdk.service(function (err, flex) {
  const functions = flex.functions;

  flex.functions.register('ratingCharts', ratingCharts);
});