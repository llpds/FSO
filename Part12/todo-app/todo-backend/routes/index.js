const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const redis = require('../redis');
const { incrAddedTodos, getAddedTodos } = require('../util/redisAction')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statistics. */
router.get('/statistics', async (_, res) => {
  const result = await getAddedTodos()
  res.json({ 'added_todos': result});
});

/* GET test incr.  delete before submitting*/
// router.get('/incr', async (_, res) => {
//   await incrAddedTodos()
//   res.send('red');
// });

module.exports = router;
