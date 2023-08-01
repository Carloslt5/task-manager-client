import TodoList from "../../components/TodoList/TodoList"


const ProfilePage = () => {

  const todos = [
    { id: 1, text: 'Finish the course' },
    { id: 2, text: 'Typescript' },
    { id: 3, text: 'React' }
  ]

  return (
    <>
      <div>ProfilePage</div>
      <TodoList todolist={todos} />
    </>
  )
}

export default ProfilePage