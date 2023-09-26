import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'

const TaskPage = () => {

  return (

    <div className='container flex flex-col h-full px-4' >
      <h1 className='text-3xl dark:text-white'>Your Task List...</h1>
      <NewTodo />
      <TodoList />
    </div>

  )
}

export default TaskPage