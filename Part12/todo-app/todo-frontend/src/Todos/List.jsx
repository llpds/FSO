import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map(todo => 
        <div key={todo._id}>
          <Todo todo={todo} deleteTodo={deleteTodo}  completeTodo={completeTodo} />
          <hr />
        </div>
      ) //.reduce((acc, cur) => [...acc, <hr />, cur], []) // throws a keys warning 
      }
    </>
  )
}

export default TodoList
