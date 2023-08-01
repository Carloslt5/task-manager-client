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
      <TodoList items={todos} />
    </>
  )
}

export default ProfilePage