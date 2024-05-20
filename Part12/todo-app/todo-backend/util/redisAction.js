const redis = require('../redis');

const incrAddedTodos = async () => {
  const oldCount = await getAddedTodos()
  const result = await redis.setAsync('added_todos', oldCount+1);
  return result
}

const getAddedTodos = async () => {
  const result = await redis.getAsync('added_todos');
  return result === null ? 0 : Number(result)
}

module.exports = {
  incrAddedTodos, getAddedTodos
}