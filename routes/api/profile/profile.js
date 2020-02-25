const express = require('express');
const router = express.Router();
// const User = require('../../models/User');

const fs = require('fs');
const path = require('path');
const fileName = path.basename(__filename);

fs.readdir(__dirname, (err, files) => {
  if (err) console.error(err);
  let subRouts = [];
  files.forEach(file => {
    if (file != fileName) {
      subRouts.push(require(`./${file}`));
    }
  });
  // console.log(subRouts);
  router.use(subRouts);
});

module.exports = router;
