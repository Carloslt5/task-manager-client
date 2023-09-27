import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
const TaskPage = () => {

  return (

    <div className='container flex flex-col h-full px-4' >
      <h1 className='text-3xl dark:text-white'>Your Task List...</h1>
      {/* <DndProvider backend={HTML5Backend}> */}
      <NewTodo />
      <TodoList />
      {/* </DndProvider> */}
    </div>

  )
}

export default TaskPage