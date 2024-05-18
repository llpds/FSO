const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

/* GET todo by id. */
router.get('/:id', async (req,res) => {
  const todo = await Todo.findById(req.params.id)
  if(todo){
    res.json(todo)
  } else {
    res.status(404).end()
  }
})

/* PUT todo to listing. */
router.put('/:id', async (req,res) => {
  const body = req.body
  if(!body.text || typeof body.text !== 'string' || body.text.length === 0) {
    res.status(401).json({ error: 'todos text must be filled and string' })
    return
  }
  const todoNew = {
    "text": body.text,
    "done": body.done || false
  }
  const todoUpdated = await Todo.findByIdAndUpdate(req.params.id, todoNew, { new:true })

  res.json(todoUpdated)
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
